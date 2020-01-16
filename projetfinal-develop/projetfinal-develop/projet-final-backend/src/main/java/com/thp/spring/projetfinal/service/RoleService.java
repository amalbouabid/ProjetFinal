package com.thp.spring.projetfinal.service;

import java.util.List;

import com.thp.spring.projetfinal.dto.RoleDTO;
import com.thp.spring.projetfinal.util.Libelle;

public interface RoleService {
	
	List<RoleDTO> findAll();

	RoleDTO findRolebyLibelle(Libelle libelle);
}
