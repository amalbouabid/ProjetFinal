package com.thp.spring.projetfinal.controller;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.thp.spring.projetfinal.entities.DBFile;
import com.thp.spring.projetfinal.exception.FileStorageException;
import com.thp.spring.projetfinal.serviceimp.DBFileStorageService;
import com.thp.spring.projetfinal.util.UploadFileResponse;

@RestController
public class FileController {

	private static final Logger logger = LoggerFactory.getLogger(FileController.class);

	@Autowired
	private DBFileStorageService dBFileStorageService;

	@Secured({ "ROLE_COLLABORATEUR", "ROLE_MANAGER", "ROLE_BORH", "ROLE_BO" })
	@PostMapping("/uploadFile")
	public UploadFileResponse uploadFile(@RequestParam("file") MultipartFile file) throws FileStorageException {
		DBFile dbFile = dBFileStorageService.storeFile(file);

		String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/downloadFile/")
				.path(dbFile.getId()).toUriString();

		return new UploadFileResponse(dbFile.getFileName(), fileDownloadUri, file.getContentType(), file.getSize());
	}

	@Secured({ "ROLE_COLLABORATEUR", "ROLE_MANAGER", "ROLE_BORH", "ROLE_BO" })
	@PostMapping("/uploadMultipleFiles")
	public List<UploadFileResponse> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files) {
		return Arrays.asList(files).stream().map(file -> {
			try {
				return uploadFile(file);
			} catch (FileStorageException e) {
				e.printStackTrace();
			}
			return null;
		}).collect(Collectors.toList());
	}

	@Secured({ "ROLE_MANAGER", "ROLE_BORH" })
	@GetMapping("/downloadFile/{fileId}")
	public ResponseEntity<Resource> downloadFile(@PathVariable String fileId) {
		// Load file from database
		DBFile dbFile = dBFileStorageService.getFile(fileId);

		return ResponseEntity.ok().contentType(MediaType.parseMediaType(dbFile.getFileType()))
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + dbFile.getFileName() + "\"")
				.body(new ByteArrayResource(dbFile.getData()));
	}
}
