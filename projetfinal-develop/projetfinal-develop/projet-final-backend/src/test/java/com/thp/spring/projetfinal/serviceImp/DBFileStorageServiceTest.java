package com.thp.spring.projetfinal.serviceImp;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.io.IOException;

import javax.transaction.Transactional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.web.multipart.MultipartFile;

import com.thp.spring.projetfinal.dto.DBFileDTO;
import com.thp.spring.projetfinal.entities.DBFile;
import com.thp.spring.projetfinal.serviceimp.DBFileStorageService;

@Transactional
@Rollback(true)
@SpringBootTest
@ActiveProfiles("test")
class DBFileStorageServiceTest {

	@Autowired
	DBFileStorageService dBFileStorageService;

	@Test
	void testStoreFile() throws IOException {
		DBFileDTO fileDTO = new DBFileDTO(null, null, null, null, null);
		DBFileDTO fileDTO2 = new DBFileDTO( null, null, null, null);
		DBFile file = new DBFile(null, null, null, null, null);
		DBFile file1 = new DBFile( null, null, null, null);
		DBFile file2 = new DBFile(null, null, null);
		MultipartFile multipartFile = new MockMultipartFile("test", "test", "test", new byte[10]);
		DBFile dbFileOutput = dBFileStorageService.storeFile(multipartFile);

		assertEquals("test", dbFileOutput.getFileName());
	}

	@Test
	void testGetFile() {
		MultipartFile multipartFile = new MockMultipartFile("test", "test", "test", new byte[10]);
		DBFile dbFileOutput = dBFileStorageService.storeFile(multipartFile);
		DBFile dbFile = dBFileStorageService.getFile(dbFileOutput.getId());
		assertEquals("test", dbFile.getFileName());
	}

}
