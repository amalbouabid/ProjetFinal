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
import com.thp.spring.projetfinal.entities.RoleEntity;
import com.thp.spring.projetfinal.service.RoleService;
import com.thp.spring.projetfinal.util.Libelle;
@Transactional
@Rollback(true)
@SpringBootTest
@ActiveProfiles("test")
class RoleServiceImpTest {
	@Autowired
	RoleService roleService;
	@Test
	void testFindAll() {
		RoleDTO role = new RoleDTO(Libelle.BO);
		RoleDTO role1 = new RoleDTO(1L,Libelle.BO);
		RoleEntity role2 = new RoleEntity(Libelle.BO);
		RoleEntity role3 = new RoleEntity(1L,Libelle.BO);

		List<RoleDTO> roles = roleService.findAll();
		 assertEquals(2, roles.size());
	}
	@Test
	void testFindRolebyLibelle() {
		RoleDTO role = roleService.findRolebyLibelle(Libelle.COLLABORATEUR);
		assertEquals(Libelle.COLLABORATEUR, role.getLibelle());
	}
}