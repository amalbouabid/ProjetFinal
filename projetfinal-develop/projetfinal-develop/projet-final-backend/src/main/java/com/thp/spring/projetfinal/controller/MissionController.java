package com.thp.spring.projetfinal.controller;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.thp.spring.projetfinal.dto.MissionDTO;
import com.thp.spring.projetfinal.dto.TacheMissionDTO;
import com.thp.spring.projetfinal.dto.TacheModeleDTO;
import com.thp.spring.projetfinal.dto.UtilisateurDTO;
import com.thp.spring.projetfinal.entities.MissionEntity;
import com.thp.spring.projetfinal.helper.ModelMapperConverter;
import com.thp.spring.projetfinal.service.MissionService;
import com.thp.spring.projetfinal.service.UtilisateurService;
import com.thp.spring.projetfinal.util.Priorite;
import com.thp.spring.projetfinal.util.Statut;

@RestController
@CrossOrigin("*")
public class MissionController {

	@Autowired
	MissionService missionService;
	@Autowired
	UtilisateurService utilisateurService;

	@Secured("ROLE_MANAGER")
	@PostMapping(value = "/mission")
	public MissionDTO addMission(@RequestBody MissionDTO missionDTO) {
		Set<TacheMissionDTO> tacheMissionDTOs = new HashSet<>();
		List<TacheModeleDTO> tacheModeleDTOs = missionDTO.getModel().getTaskModels();

		for (TacheModeleDTO tacheModeleDTO : tacheModeleDTOs) {
			TacheMissionDTO tacheMissionDTO = new TacheMissionDTO();
			tacheMissionDTO.setNomTache(tacheModeleDTO.getNom());

			tacheMissionDTO.setPriorite(tacheModeleDTO.getPriorite());
			tacheMissionDTO.setCategorie(tacheModeleDTO.getCategorie());
			tacheMissionDTO.setRole(tacheModeleDTO.getRole());

			switch (tacheModeleDTO.getRole().getLibelle()) {
			case COLLABORATEUR:
				tacheMissionDTO.setUtilisateur(missionDTO.getCollaborateur());
				break;
			case MANAGER:
				tacheMissionDTO.setUtilisateur(missionDTO.getCollaborateur().getManager());
				break;
			case BO:
				tacheMissionDTO.setUtilisateur(utilisateurService.findByPseudo("laila"));
				break;
			case BORH:
				tacheMissionDTO.setUtilisateur(utilisateurService.findByPseudo("laila"));
				break;
			default:
			}

			if (tacheModeleDTO.getPriorite() == Priorite.p1) {
				tacheMissionDTO.setDateAffectation(new Date());
				Date date = new Date();
				Calendar c = Calendar.getInstance();
				c.setTime(date);
				c.add(Calendar.DATE, Integer.parseInt(tacheModeleDTO.getDateEcheance()));
				date = c.getTime();
				tacheMissionDTO.setDateEcheance(date);
			}
			if (tacheModeleDTO.getPriorite() == Priorite.p0) {
				tacheMissionDTO.setDateAffectation(new Date());
				Date date = new Date();
				Calendar c = Calendar.getInstance();
				c.setTime(date);
				c.add(Calendar.DATE, Integer.parseInt(tacheModeleDTO.getDateEcheance()));
				date = c.getTime();
				tacheMissionDTO.setDateEcheance(date);
				tacheMissionDTO.setStatus(Statut.DOING);
			} else {
				tacheMissionDTO.setDateAffectation(new Date());
				Date date = new Date();
				Calendar c = Calendar.getInstance();
				c.setTime(date);
				c.add(Calendar.DATE, Integer.parseInt(tacheModeleDTO.getDateEcheance()));
				date = c.getTime();
				tacheMissionDTO.setDateEcheance(date);
				tacheMissionDTO.setStatus(Statut.TODO);
			}
			tacheMissionDTOs.add(tacheMissionDTO);
		}
		missionDTO.setTachesMissions(tacheMissionDTOs);
		missionDTO.setStatus(Statut.DOING);
		return missionService.addMission(missionDTO);
	}

	@GetMapping(value = "/mission/{id}")
	public MissionDTO getMissionById(@PathVariable Long id) {
		return missionService.findById(id);
	}

	@GetMapping(value = "/mission/collab")
	public MissionDTO getMisiionByUtilisateur(@RequestParam Long id) {
		List<MissionDTO> missionsCollab = missionService.findByUtilisateur(id);
		return missionsCollab.get(missionsCollab.size() - 1);
	}

	@GetMapping(value = "/mission")
	public List<MissionDTO> findAllUser() {
		return missionService.findAll();

	}

	@DeleteMapping(value = "/mission/{idMission}")
	public void deleteMission(@PathVariable Long idMission) {
		missionService.deleteMission(idMission);
	}

	@Secured("ROLE_BORH")
	@PutMapping(value = "/mission")
	public MissionDTO updateMission(@RequestBody MissionDTO missionDTO) {
//		MissionDTO missionB = missionService.findById(missionDTO.getId());
//		missionDTO.setCollaborateur(missionB.getCollaborateur());
//		missionDTO.setModel(missionB.getModel());

		return missionService.addMission(missionDTO);
	}

	@PutMapping(value = "/ajoutTache")
	public MissionDTO updateTacheMission(@RequestBody MissionDTO missionDTO) {
		MissionDTO mission = missionService.findById(missionDTO.getId());
//		missionDTO.setCollaborateur(mission.getCollaborateur());
//		mission.getTachesMissions().addAll(missionDTO.getTachesMissions());

//		missionDTO.setTachesMissions(mission.getTachesMissions());
//		for (TacheMissionDTO e : missionDTO.getTachesMissions()) {
//		
//			System.out.println(("-----"+e.getNomTache()));
//			
//		}
		mission.setTachesMissions(missionDTO.getTachesMissions());
		for (TacheMissionDTO e : missionDTO.getTachesMissions()) {
			System.out.println("--------------");

			System.out.println(e);
		}
		return missionService.addMission(mission);
	}

	@GetMapping(value = "/missionsCollaborateursManager")
	public List<MissionDTO> getMissionsCollaborateurOfManager(@RequestParam String managerPseudo) {
		List<MissionDTO> missionCollaborateurs = new ArrayList<>();
		List<UtilisateurDTO> collaborateursManager = utilisateurService.findCollaborateursOfManager(managerPseudo);
		for (UtilisateurDTO collaborateur : collaborateursManager) {

			missionCollaborateurs
					.addAll(ModelMapperConverter.convertAllToDTO(collaborateur.getMission(), MissionDTO.class));
		}
		return missionCollaborateurs;
	}

	@Secured({ "ROLE_MANAGER", "ROLE_BORH" })
	@PutMapping(value = "/annulermission/{id}")
	public MissionEntity annulerMissionByid(@PathVariable Long id) {
		return missionService.annulerMission(id);
	}

	@Secured({ "ROLE_MANAGER", "ROLE_BORH" })
	@PutMapping(value = "/validerMission/{id}")
	public MissionDTO validerMissionByid(@PathVariable Long id) {
		return missionService.validerMission(id);
	}
	
	@GetMapping(value = "/tachesmissions/{id}")
	public MissionDTO findByTachesMissions(@PathVariable Long id ) {
		return missionService.findByTachesMissions(id);
	}
}
