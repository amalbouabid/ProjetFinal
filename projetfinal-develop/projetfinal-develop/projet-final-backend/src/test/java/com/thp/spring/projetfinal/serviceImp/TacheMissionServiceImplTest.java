
package com.thp.spring.projetfinal.serviceImp;

import static org.junit.Assert.assertEquals;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import com.thp.spring.projetfinal.dto.TacheMissionDTO;
import com.thp.spring.projetfinal.entities.TacheMissionEntity;
import com.thp.spring.projetfinal.service.TacheMissionService;
import com.thp.spring.projetfinal.util.Categorie;
@Transactional
@Rollback(true)
@SpringBootTest
@ActiveProfiles("test")
class TacheMissionServiceImplTest {
@Autowired
TacheMissionService tacheMissionService;



	@Test
	void testFindAll() throws Exception{
		List<TacheMissionDTO> task = tacheMissionService.findAll();
		assertEquals(1, task.size());	}


	@Test
	void testAddTask() {
		TacheMissionEntity tache = new TacheMissionEntity(null, null, null, null, null, null, null, null, null, null, null, null, null);
		TacheMissionEntity tache1 = new TacheMissionEntity( null, null, null, null, null, null, null, null, null, null, null, null);

		TacheMissionDTO tacheDTO = new TacheMissionDTO("tache",Categorie.DOCUMENT);
		TacheMissionDTO tacheDTO1 = tacheMissionService.addTask(tacheDTO);
		assertEquals(tacheDTO.getNomTache(), tacheDTO1.getNomTache());	}


	@Test
	void testGetTacheMissionByUtilisateurId() {
		List<TacheMissionDTO> taskDTO = tacheMissionService.getTacheMissionByUtilisateurId(1L);
		assertEquals(1, taskDTO.size());	}


}
