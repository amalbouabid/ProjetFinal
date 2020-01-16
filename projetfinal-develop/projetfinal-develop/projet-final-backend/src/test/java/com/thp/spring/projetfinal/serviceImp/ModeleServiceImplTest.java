package com.thp.spring.projetfinal.serviceImp;

import static org.junit.Assert.assertEquals;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import com.thp.spring.projetfinal.dto.ModeleDTO;
import com.thp.spring.projetfinal.service.ModelService;
import com.thp.spring.projetfinal.util.Type;
@Transactional
@Rollback(true)
@SpringBootTest
@ActiveProfiles("test")
class ModeleServiceImplTest {
@Autowired
ModelService modelService;
	@Test
	void testAddModel() {
		ModeleDTO modelDTO = new ModeleDTO("modele2", "a faire", Type.LONG_SEJOUR);
		ModeleDTO modelDTO1 = modelService.addModel(modelDTO);
		assertEquals(modelDTO.getDescription(), modelDTO1.getDescription());
	}

	@Test
	void testFindById() {
		ModeleDTO modelDTO = modelService.findById(1L);
		assertEquals("desc", modelDTO.getDescription());		}

	@Test
	void testFindAll() {
		List<ModeleDTO> modeles = modelService.findAll();
		 assertEquals(2, modeles.size());	}

	@Test
	void testDeleleModel() {
		modelService.deleleModel(2L);
		List<ModeleDTO> modeles = modelService.findAll();
		System.out.println(modeles);
		 assertEquals(1,modeles.size());	}

}
