
package com.thp.spring.projetfinal.serviceImp;

import static org.junit.Assert.assertEquals;

import java.util.List;

import javax.transaction.Transactional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.ActiveProfiles;

import com.thp.spring.projetfinal.dto.RoleDTO;
import com.thp.spring.projetfinal.dto.UtilisateurDTO;
import com.thp.spring.projetfinal.entities.MissionEntity;
import com.thp.spring.projetfinal.entities.RoleEntity;
import com.thp.spring.projetfinal.entities.UtilisateurEntity;
import com.thp.spring.projetfinal.service.UtilisateurService;

@Transactional
@Rollback(true)

@SpringBootTest
@ActiveProfiles("test")
class UtilisateurServiceImpTest {
	@Autowired
	UtilisateurService utilisateurService;

	@Test
	void testAddUtilisateur() {
		UtilisateurDTO userDTO = new UtilisateurDTO(null, null, null, null, null, null, null, null, null, null);
		UtilisateurDTO userDTO2 = new UtilisateurDTO(null, null, null);
		UtilisateurDTO userDTO3 = new UtilisateurDTO(null, null, null, new RoleDTO());
		UtilisateurDTO userDTO4 = new UtilisateurDTO(null, null, null, null, null, null, null, null, null, null,
				new UtilisateurDTO(), null, null, new RoleDTO());
		UtilisateurDTO userDTO5 = new UtilisateurDTO(null, null, null, null, null, null, null, null, null,
				new UtilisateurDTO(), null, null, new RoleDTO());
		UtilisateurEntity user = new UtilisateurEntity(null, null);
		UtilisateurEntity user1 = new UtilisateurEntity(null, null, null);
		UtilisateurEntity user2 = new UtilisateurEntity(1L, "test", "test", "", "", "", "", "", "", "", "",
				new UtilisateurEntity(), null, null, null);
		UtilisateurEntity user3 = new UtilisateurEntity("test", "test", "", "", "", "", "", "", "", "",
				new UtilisateurEntity(), null, null, null);

		UtilisateurDTO utilisateurDTO = new UtilisateurDTO("akrem", "zitouni", "moez@gmial.com");
		UtilisateurDTO utilisateurDTO1 = utilisateurService.addUtilisateur(utilisateurDTO);
		assertEquals(utilisateurDTO.getPseudo(), utilisateurDTO1.getPseudo());
	}

	@Test
	void testFindById() {
		UtilisateurDTO utilisateur = utilisateurService.findById(1L);
		assertEquals("hajer", utilisateur.getPseudo());
	}

	@Test
	void testFindAll() {
		List<UtilisateurDTO> utlisateurs = utilisateurService.findAll();
		assertEquals(3, utlisateurs.size());
	}

	@Test
	void testFindByPseudo() {
		UtilisateurDTO utilisateurDTO = utilisateurService.findByPseudo("moez");
		System.out.println(utilisateurDTO);
		assertEquals("moez", utilisateurDTO.getPseudo());
	}

	@Test
	void testDeleteUtilisateur() {
		utilisateurService.deleteUtilisateur(3L);
		List<UtilisateurDTO> utlisateurDTOs = utilisateurService.findAll();
		assertEquals(2, utlisateurDTOs.size());
	}

}
