package com.thp.spring.projetfinal.serviceImp;

import static org.junit.Assert.assertEquals;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import com.thp.spring.projetfinal.dto.TacheModeleDTO;
import com.thp.spring.projetfinal.entities.TacheModeleEntity;
import com.thp.spring.projetfinal.service.TacheModeleService;
import com.thp.spring.projetfinal.util.Priorite;
import com.thp.spring.projetfinal.util.Statut;
@Transactional
@Rollback(true)

@SpringBootTest


@ActiveProfiles("test")
class TacheModeleServiceImplTest {
@Autowired
TacheModeleService tacheModeleService;
	@Test
	void testAjoutTaskModele() {
		TacheModeleEntity tacheModel = new TacheModeleEntity(null, null, null, null, null, null, null, null, null, null, null);
		TacheModeleEntity tacheModel1 = new TacheModeleEntity( null, null, null, null, null, null, null, null, null, null);

		TacheModeleDTO tacheModelDTO = new TacheModeleDTO(3L, "hebergement", Priorite.p1, Statut.DOING);
		TacheModeleDTO tacheModelDTO1 = tacheModeleService.ajoutTaskModele(tacheModelDTO);
		assertEquals(tacheModelDTO.getPriorite(), tacheModelDTO1.getPriorite());
	}

	@Test
	void testFindById() {
		TacheModeleDTO tacheModelDTO = tacheModeleService.findById(1L);
		assertEquals("com", tacheModelDTO.getCommentaire());	}

	@Test
	void testFindAll() {
		List<TacheModeleDTO> tacheModelDTOs = tacheModeleService.findAll();
		 assertEquals(2, tacheModelDTOs.size());
	}

	@Test
	void testDeleteTaskModele() {
		tacheModeleService.deleteTaskModele(2L);;
		List<TacheModeleDTO>  tacheModelDTOs = tacheModeleService.findAll();
		System.out.println(tacheModelDTOs);
		 assertEquals(1,tacheModelDTOs.size());
	}

	@Test
	void testFindTaskModeleByNom() {
		TacheModeleDTO tacheModelDTO = tacheModeleService.findTaskModeleByNom("nom2");
		assertEquals("nom2", tacheModelDTO.getNom());
	}

}
