package com.thp.spring.projetfinal.serviceimp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thp.spring.projetfinal.dto.RoleDTO;
import com.thp.spring.projetfinal.entities.RoleEntity;
import com.thp.spring.projetfinal.helper.ModelMapperConverter;
import com.thp.spring.projetfinal.repository.RoleRepository;
import com.thp.spring.projetfinal.service.RoleService;
import com.thp.spring.projetfinal.util.Libelle;

@Service
public class RoleServiceImp implements RoleService {

	@Autowired
	RoleRepository roleRepository;



	@Override
	public List<RoleDTO> findAll() {
		List<RoleEntity> role = roleRepository.findAll();
		return ModelMapperConverter.convertAllToDTO(role, RoleDTO.class);
	}

	@Override
	public RoleDTO findRolebyLibelle(Libelle libelle) {
		return ModelMapperConverter.converToDTO(roleRepository.findByLibelle(libelle), RoleDTO.class);

	}

}
