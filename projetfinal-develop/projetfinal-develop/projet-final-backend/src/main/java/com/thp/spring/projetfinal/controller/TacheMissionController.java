package com.thp.spring.projetfinal.controller;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.thp.spring.projetfinal.dto.MailDTO;
import com.thp.spring.projetfinal.dto.MissionDTO;
import com.thp.spring.projetfinal.dto.TacheMissionDTO;
import com.thp.spring.projetfinal.dto.UtilisateurDTO;
import com.thp.spring.projetfinal.service.EmailService;
import com.thp.spring.projetfinal.service.MissionService;
import com.thp.spring.projetfinal.service.TacheMissionService;
import com.thp.spring.projetfinal.service.UtilisateurService;
import com.thp.spring.projetfinal.util.Categorie;
import com.thp.spring.projetfinal.util.Priorite;
import com.thp.spring.projetfinal.util.Statut;

@RestController
@CrossOrigin("*")
public class TacheMissionController {

	@Autowired
	TacheMissionService tacheMissionService;
	@Autowired
	EmailService emailService;
	@Autowired
	MissionService missionService;
	@Autowired
	UtilisateurService utilisateurService;

	@GetMapping(value = "/taches")
	public List<TacheMissionDTO> findAll() {
		return tacheMissionService.findAll();
	}

	@PutMapping(value = "/taches/update", produces = MediaType.APPLICATION_JSON_VALUE)
	public TacheMissionDTO updateTask(@RequestBody TacheMissionDTO taskToUpdate) {
		System.out.println("updated status");
		System.out.println(taskToUpdate);
		return tacheMissionService.addTask(taskToUpdate);
	}

	@PutMapping(value = "/taches/updateM", produces = MediaType.APPLICATION_JSON_VALUE)
	public TacheMissionDTO updateTaskMission(@RequestBody TacheMissionDTO taskToUpdate, @RequestParam Long idMission) {
		TacheMissionDTO tache = new TacheMissionDTO();
		Calendar c = Calendar.getInstance();
		Date dateEcheance = new Date();
		c.setTime(dateEcheance);
		c.add(Calendar.DATE, 7);
		dateEcheance = c.getTime();
		MissionDTO mission = missionService.findById(idMission);
		if (taskToUpdate.getNomTache().equals("visa")
				&& taskToUpdate.getDateValidation().compareTo(mission.getDateFin()) < 0) {
			tache = new TacheMissionDTO(new Date(), dateEcheance, "Dossier Visa",
					utilisateurService.findByPseudo("laila"), "Photo d'identité", Priorite.p1, Statut.TODO,
					Categorie.DOCUMENT, null, null, null, null);
			mission.getTachesMissions().add(tache);
			missionService.addMission(mission);
		}
		if (taskToUpdate.getNomTache().equals("passeport")
				&& taskToUpdate.getDateValidation().compareTo(mission.getDateFin()) < 0) {
			tache = new TacheMissionDTO(new Date(), dateEcheance, "Renouvellement Passeport",
					utilisateurService.findByPseudo("laila"), "Attestation de travail", Priorite.p1, Statut.TODO,
					Categorie.DOCUMENT, null, null, null, null);

			mission.getTachesMissions().add(tache);
			missionService.addMission(mission);
		}

		MissionDTO missionDTO = missionService.findById(idMission);

		Set<TacheMissionDTO> tachesMissions = missionDTO.getTachesMissions();
		for (TacheMissionDTO tacheP1 : tachesMissions) {
			if (tacheP1.getPriorite() == Priorite.p1) {
				tacheP1.setStatus(Statut.DOING);
				tacheMissionService.addTask(tacheP1);
			}
		}

		return tacheMissionService.addTask(taskToUpdate);
	}

	@GetMapping(value = "/taches/{idUser}")
	public List<TacheMissionDTO> findMissionByUtilisateur(@PathVariable Long idUser) {
		return tacheMissionService.getTacheMissionByUtilisateurId(idUser);

	}

	@GetMapping(value = "/tachesp/{priorite}")
	public List<TacheMissionDTO> findMissionByUserAndPriorite(@PathVariable Long idUser) {

		return tacheMissionService.getTacheMissionByUtilisateurId(idUser);

	}

	@GetMapping(value = "/tachesCollaborateur/{idUser}")

	public List<TacheMissionDTO> getTacheCollaborateur(@PathVariable Long idUser) {
		List<TacheMissionDTO> tacheCollaborateur = new ArrayList<TacheMissionDTO>();
		List<TacheMissionDTO> tacheCollaborateurById = tacheMissionService.getTacheMissionByUtilisateurId(idUser);
		for (TacheMissionDTO tacheDTO : tacheCollaborateurById) {
			if (tacheDTO.getStatus() == Statut.DOING) {
				tacheCollaborateur.add(tacheDTO);
			}
		}

		return tacheCollaborateur;
	}

	@GetMapping(value = "/tachesCollaborateurPriorite/{idUser}")
	public List<TacheMissionDTO> getTacheCollaborateurPriorite(@PathVariable Long idUser) {
		List<TacheMissionDTO> tacheCollaborateur = new ArrayList<TacheMissionDTO>();
		List<TacheMissionDTO> tacheCollaborateurById = tacheMissionService.getTacheMissionByUtilisateurId(idUser);
		for (TacheMissionDTO tacheDTO : tacheCollaborateurById) {
			if (tacheDTO.getPriorite() == Priorite.p0) {
				tacheCollaborateur.add(tacheDTO);
			}
		}
		return tacheCollaborateur;
	}

	/* Si le Manager a une seule mission */
	@Secured("ROLE_COLLABORATEUR")
	@GetMapping(value = "/mailManager/{pseudo}")
	public void evoyerEmail(@PathVariable String pseudo) {

		//////////
		MailDTO mMessage = new MailDTO();
		UtilisateurDTO utilisateurDTO = utilisateurService.findByPseudo(pseudo);
		Long idManager = utilisateurDTO.getManager().getId();
		Long idCollab = utilisateurDTO.getId();
		String[] s = new String[] { utilisateurService.findById(idManager).getMail() };

		mMessage.setTo(s);
		mMessage.setSubject("Suivi Mission " + utilisateurDTO.getNom() + " " + utilisateurDTO.getPrenom());
		mMessage.setText("Bonjour " + utilisateurService.findById(idManager).getNom() + " "
				+ utilisateurService.findById(idManager).getPrenom() + ",\n" + "Le collaborateur "
				+ utilisateurDTO.getNom() + " " + utilisateurDTO.getPrenom() + " "
				+ "a soumis avec succès les documents nécessaires: Visa et Passeport. \n"
				+ "Veuillez consulter le site Byblos pour plus d'informations. \n" + "Cordialement, \n"
				+ "Byblos Team\n");

		emailService.sendEmail(mMessage);

	}

	@Secured("ROLE_BORH")
	@DeleteMapping(value = "/tache/{id}")
	public void deleteUser(@PathVariable Long id) {
		tacheMissionService.deleteTacheMission(id);
	}

}
