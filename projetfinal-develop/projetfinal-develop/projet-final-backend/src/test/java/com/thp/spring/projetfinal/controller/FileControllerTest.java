package com.thp.spring.projetfinal.controller;

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import javax.transaction.Transactional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.thp.spring.projetfinal.entities.DBFile;
import com.thp.spring.projetfinal.serviceimp.DBFileStorageService;
import com.thp.spring.projetfinal.util.UploadFileResponse;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@Transactional
@Rollback(true)
class FileControllerTest {

	@Autowired
	private MockMvc mockMvc;
	@Autowired
	WebApplicationContext webApplicationContext;
	@Autowired
	DBFileStorageService dBFileStorageService;

	@BeforeEach
	protected void setUp() {
		mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).apply(springSecurity()).build();
	}

	@WithMockUser(roles = "COLLABORATEUR")
	@Test
	void testUploadFile() throws Exception {
		MockMultipartFile multipartFile = new MockMultipartFile("test", "test", "test", new byte[10]);


		this.mockMvc.perform(MockMvcRequestBuilders.multipart("/uploadFile")
				.contentType(MediaType.MULTIPART_FORM_DATA_VALUE)
			.content("?file="+multipartFile))
				.andExpect(status().isOk());
	}

	@WithMockUser(roles = "COLLABORATEUR")
	@Test
	void testUploadMultipleFiles() {
	}

	@WithMockUser(roles = "MANAGER")
	@Test
	void testDownloadFile() throws Exception {
		MultipartFile multipartFile = new MockMultipartFile("test", "test", "test", new byte[10]);
		DBFile dbFileOutput = dBFileStorageService.storeFile(multipartFile);
		dbFileOutput.setFileType("text/plain");
		DBFile dbFile = dBFileStorageService.getFile(dbFileOutput.getId());
		dbFile.setFileType("text/plain");
		this.mockMvc.perform(get("/downloadFile/" + dbFileOutput.getId())
				.contentType(MediaType.parseMediaType(dbFile.getFileType()))).andExpect(status().isOk());
	}

}
