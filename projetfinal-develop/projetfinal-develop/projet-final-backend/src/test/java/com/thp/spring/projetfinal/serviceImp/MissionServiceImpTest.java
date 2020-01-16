package com.thp.spring.projetfinal.serviceImp;

import static org.junit.Assert.assertEquals;

import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ActiveProfiles;

import com.thp.spring.projetfinal.dto.MissionDTO;
import com.thp.spring.projetfinal.dto.UtilisateurDTO;
import com.thp.spring.projetfinal.entities.MissionEntity;
import com.thp.spring.projetfinal.entities.ModeleEntity;
import com.thp.spring.projetfinal.entities.TacheMissionEntity;
import com.thp.spring.projetfinal.entities.UtilisateurEntity;
import com.thp.spring.projetfinal.service.MissionService;
import com.thp.spring.projetfinal.util.Statut;
@Transactional
@Rollback(true)
@SpringBootTest
@ActiveProfiles("test")
class MissionServiceImpTest {

	@Autowired
	MissionService missionService;
	
	@Test
	void testAddMission() {
		UtilisateurDTO utilisateurDTO = new UtilisateurDTO(4L,"moez", "khediri", "moez@gmial.com");
		MissionEntity mission = new MissionEntity("test",new Date() , new Date(), new UtilisateurEntity(),
				new ModeleEntity(), null , Statut.DOING);
		MissionEntity mission2 = new MissionEntity(1L,"test",new Date() , new Date(), new UtilisateurEntity(),
				new ModeleEntity(), null , Statut.DOING);
		MissionDTO missionDTO = new MissionDTO("detachement a l'etranger", utilisateurDTO, Statut.DOING);
		MissionDTO missionDTO1 = missionService.addMission(missionDTO);
		assertEquals(missionDTO.getDescription(), missionDTO1.getDescription());
	}

	@Test
	void testFindById() {
		MissionDTO missionDTO = missionService.findById(1L);
		assertEquals("desc", missionDTO.getDescription());
	}

	@Test
	void testFindAll() {
        List<MissionDTO> missionDTOs = missionService.findAll();
        assertEquals(1, missionDTOs.size());
	}

	@Test
	void testDeleteMission() {
		missionService.deleteMission(1L);
		List<MissionDTO> missionDTOs = missionService.findAll();
		assertEquals(0, missionDTOs.size());
	}

	@Test
	void testFindByDescription() {
		MissionDTO missionDTO = missionService.findByDescription("desc");
		assertEquals("desc", missionDTO.getDescription());
	}

	@Test
	void testFindByUtilisateur() {
		List<MissionDTO> missionDTO = missionService.findByUtilisateur(2L);
		assertEquals("moez", missionDTO.get(0).getCollaborateur().getPseudo());
		}

	@Test
	void testAnnulerMission() {
		missionService.annulerMission(1L);
		MissionDTO missionDTO = missionService.findById(1L);
		assertEquals(Statut.CANCELED, missionDTO.getStatus());
	}

	@Test
	void testValiderMission() {
		missionService.validerMission(1L);
		MissionDTO missionDTO = missionService.findById(1L);
		assertEquals(Statut.DONE, missionDTO.getStatus());
	}

	@Test
	void testFindByCollaborateurManagerId() {
    MissionDTO missionDTO = missionService.findByCollaborateurManagerId(1L);
    assertEquals("desc", missionDTO.getDescription());
	} 

}
