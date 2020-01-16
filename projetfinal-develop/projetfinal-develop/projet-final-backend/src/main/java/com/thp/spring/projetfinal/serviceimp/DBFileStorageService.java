package com.thp.spring.projetfinal.serviceimp;

import java.io.IOException;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.thp.spring.projetfinal.entities.DBFile;
import com.thp.spring.projetfinal.exception.FileStorageException;
import com.thp.spring.projetfinal.exception.MyFileNotFoundException;
import com.thp.spring.projetfinal.repository.DBFileRepository;

@Service
public class DBFileStorageService {

	@Autowired
	DBFileRepository dbFileRepository;

	@Transactional

	public DBFile storeFile(MultipartFile file) throws FileStorageException {
		// Normalize file name
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());

		try {
			// Check if the file's name contains invalid characters
			if (fileName.contains("..")) {
				throw new FileStorageException("Sorry! Filename contains invalid path sequence " + fileName);
			}

			DBFile dbFile = new DBFile(fileName, file.getContentType(), file.getBytes());

			return dbFileRepository.save(dbFile);
		} catch (IOException ex) {
			throw new FileStorageException("Could not store file " + fileName + ". Please try again!", ex);
		}
	}

	@Transactional
	public DBFile getFile(String fileId) throws MyFileNotFoundException {
		return dbFileRepository.findById(fileId)
				.orElseThrow(() -> new MyFileNotFoundException("File not found with id " + fileId));
	}
}