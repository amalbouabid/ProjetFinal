package com.thp.spring.projetfinal.controller;

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.thp.spring.projetfinal.dto.MissionDTO;
import com.thp.spring.projetfinal.dto.ModeleDTO;
import com.thp.spring.projetfinal.dto.RoleDTO;
import com.thp.spring.projetfinal.dto.TacheMissionDTO;
import com.thp.spring.projetfinal.dto.TacheModeleDTO;
import com.thp.spring.projetfinal.dto.UtilisateurDTO;
import com.thp.spring.projetfinal.entities.MissionEntity;
import com.thp.spring.projetfinal.helper.ModelMapperConverter;
import com.thp.spring.projetfinal.util.Categorie;
import com.thp.spring.projetfinal.util.Libelle;
import com.thp.spring.projetfinal.util.Priorite;
import com.thp.spring.projetfinal.util.Statut;
import com.thp.spring.projetfinal.util.Validite;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@Transactional
@Rollback(true)
class MissionControllerTest {

	@Autowired
	private MockMvc mockMvc;
	@Autowired
	WebApplicationContext webApplicationContext;

	@BeforeEach
	protected void setUp() {
		mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).apply(springSecurity()).build();
	}

	@WithMockUser(roles = "MANAGER")
	@Test
	void testAddMission() throws Exception {

		TacheModeleDTO tacheModeleDTO = new TacheModeleDTO("test", "3", null, Categorie.PROCEDURE,
				new RoleDTO(Libelle.COLLABORATEUR), Priorite.p0, Statut.DOING, Validite.VALIDE, new Date(), "test");
		List<TacheModeleDTO> tacheModeleDTOs = new ArrayList<>();
		tacheModeleDTOs.add(tacheModeleDTO);
		Set<TacheMissionDTO> tachesMissionDTOs = new HashSet<>();
		TacheMissionDTO tacheMissionDTO = new TacheMissionDTO(1L, "Test Tache", Categorie.PROCEDURE);
		tachesMissionDTOs.add(tacheMissionDTO);
		ModeleDTO modeleDTO = new ModeleDTO(1L, tacheModeleDTOs);
		UtilisateurDTO utilisateurDTO = new UtilisateurDTO(2L);
		MissionDTO mission = new MissionDTO(100L, "", new Date(), new Date(), utilisateurDTO, modeleDTO,
				tachesMissionDTOs, Statut.DOING);

		this.mockMvc.perform(post("/mission")

				.content(asJsonString(mission))

				.contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON))

				.andExpect(status().isOk());

	}

	@WithMockUser(roles = "COLLABORATEUR")
	@Test
	void testGetMisiionById() throws Exception {
		MissionDTO missionDTO = new MissionDTO("test", null);
		List<MissionDTO> missions = new ArrayList<MissionDTO>();
		missions.add(missionDTO);
		ModelMapperConverter.convertAllToEntity(missions, MissionEntity.class);
		this.mockMvc.perform(get("/mission?id=1")).andExpect(status().isOk());
	}

	@WithMockUser(roles = "COLLABORATEUR")
	@Test
	void testGetMisiionByUtilisateur() throws Exception {

		this.mockMvc.perform(get("/mission/collab?id=1")).andExpect(status().isOk());

	}

	@WithMockUser(roles = "COLLABORATEUR")
	@Test
	void testFindAllUser() throws Exception {
		this.mockMvc.perform(get("/mission")).andExpect(status().isOk());
	}

	@WithMockUser(roles = "COLLABORATEUR")
	@Test
	void testDeleteMission() throws Exception {
		this.mockMvc.perform(delete("/mission/1")).andExpect(status().isOk());
	}

	@WithMockUser(roles = "BORH")
	@Test
	void testUpdateMission() throws Exception {

		UtilisateurDTO utilisateurDTO = new UtilisateurDTO(1L);
		MissionDTO missionDTO = new MissionDTO(1L, "desription", utilisateurDTO, Statut.TODO);

		this.mockMvc.perform(put("/mission")

				.content(asJsonString(missionDTO)).contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON))

				.andExpect(status().isOk());
	}

	@WithMockUser(roles = "COLLABORATEUR")
	@Test

	void testMissionsCollaborateurOfManager() throws Exception {
		this.mockMvc.perform(get("/missionsCollaborateursManager?managerPseudo=hajer")).andExpect(status().isOk());
	}

	@WithMockUser(roles = { "MANAGER", "BORH" })
	@Test
	void testAnnulerMissionByid() throws Exception {

		this.mockMvc.perform(put("/annulermission/1")).andExpect(status().isOk());
	}

	@WithMockUser(roles = { "MANAGER", "BORH" })
	@Test
	void testValiderMissionByid() throws Exception {
		this.mockMvc.perform(put("/validerMission/1")).andExpect(status().isOk());
	}

	public static String asJsonString(final Object obj) throws JsonProcessingException {

		final ObjectMapper mapper = new ObjectMapper();
		final String jsonContent = mapper.writeValueAsString(obj);
		return jsonContent;

	}

}
