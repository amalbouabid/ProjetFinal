package com.thp.spring.projetfinal.serviceimp;

import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.thp.spring.projetfinal.dto.MissionDTO;
import com.thp.spring.projetfinal.entities.MissionEntity;
import com.thp.spring.projetfinal.entities.TacheMissionEntity;
import com.thp.spring.projetfinal.helper.ModelMapperConverter;
import com.thp.spring.projetfinal.repository.MissionRepository;
import com.thp.spring.projetfinal.service.MissionService;
import com.thp.spring.projetfinal.util.Statut;

@Service
public class MissionServiceImp implements MissionService {

	@Autowired
	MissionRepository missionRepository;

	@Override
	public MissionDTO addMission(MissionDTO missionDTO) {
		MissionEntity missionEntity = ModelMapperConverter.converToEntity(missionDTO, MissionEntity.class);
		return ModelMapperConverter.converToDTO(missionRepository.save(missionEntity), MissionDTO.class);
	}

	@Override
	public MissionDTO findById(Long id) {
		MissionEntity mission = missionRepository.findById(id).orElse(null);
	
		return ModelMapperConverter.converToDTO(mission, MissionDTO.class);
	}

	@Override
	@Transactional
	public List<MissionDTO> findAll() {
		List<MissionEntity> mission = missionRepository.findAll();
		return ModelMapperConverter.convertAllToDTO(mission, MissionDTO.class);
	}

	@Override
	public void deleteMission(Long id) {
		missionRepository.deleteById(id);

	}

	@Override
	public MissionDTO findByDescription(String description) {
		MissionEntity mission = missionRepository.findByDescription(description);
		return ModelMapperConverter.converToDTO(mission, MissionDTO.class);

	}

	@Override
	public List<MissionDTO> findByUtilisateur(Long idUtilisateur) {
		List<MissionEntity> missions = missionRepository.findByCollaborateurId(idUtilisateur);
	
		return ModelMapperConverter.convertAllToDTO(missions, MissionDTO.class);
	}

	@Override
	public MissionEntity annulerMission(Long id) {
		MissionEntity mission = missionRepository.findById(id).orElse(null);
		mission.setStatus(Statut.CANCELED);
		Set<TacheMissionEntity> tacheMissions = mission.getTachesMissions();
		for (TacheMissionEntity tacheMissionEntity : tacheMissions) {
			tacheMissionEntity.setStatus(Statut.CANCELED);
		}
		mission.setTachesMissions(tacheMissions);

		return missionRepository.save(mission);
	}

	@Override
	public MissionDTO findByCollaborateurManagerId(Long idManager) {
		MissionEntity mission = missionRepository.findByCollaborateurManagerId(idManager);

		return ModelMapperConverter.converToDTO(mission, MissionDTO.class);
	}

	@Override
	public MissionDTO validerMission(Long id) {
		MissionEntity mission = missionRepository.findById(id).orElse(null);
		mission.setStatus(Statut.DONE);
		Set<TacheMissionEntity> tacheMissions = mission.getTachesMissions();
		for (TacheMissionEntity tacheMissionEntity : tacheMissions) {
			tacheMissionEntity.setStatus(Statut.DONE);
		}
		mission.setTachesMissions(tacheMissions);
	
		return ModelMapperConverter.converToDTO(missionRepository.save(mission), MissionDTO.class);
	}

	@Override
	public MissionDTO findByTachesMissions(Long id) {
	MissionEntity mission = missionRepository.findMissionUser(id);
		
		return ModelMapperConverter.converToDTO(mission, MissionDTO.class);
	}

 

}
