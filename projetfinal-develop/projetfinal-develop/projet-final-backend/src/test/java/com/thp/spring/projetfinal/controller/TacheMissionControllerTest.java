package com.thp.spring.projetfinal.controller;

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.thp.spring.projetfinal.dto.TacheMissionDTO;
import com.thp.spring.projetfinal.dto.UtilisateurDTO;
import com.thp.spring.projetfinal.entities.RoleEntity;
import com.thp.spring.projetfinal.entities.TacheMissionEntity;
import com.thp.spring.projetfinal.entities.UtilisateurEntity;
import com.thp.spring.projetfinal.service.TacheMissionService;
import com.thp.spring.projetfinal.util.Categorie;
import com.thp.spring.projetfinal.util.Statut;

@Transactional
@Rollback(true)
@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
class TacheMissionControllerTest {
	@MockBean
	private TacheMissionService tacheMissionService;
	@Autowired
	private MockMvc mockMvc;
	@Autowired
	WebApplicationContext webApplicationContext;

	@BeforeEach
	protected void setUp() {
		mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).apply(springSecurity()).build();
	}

	@WithMockUser(roles = "COLLABORATEUR")
	@Test
	void testFindAll() throws Exception {
		this.mockMvc.perform(get("/taches")).andExpect(status().isOk());
	}

	@WithMockUser(roles = "COLLABORATEUR")

	@Test
	void testUpdateTask() throws Exception {

		TacheMissionDTO tacheMissionDTO = new TacheMissionDTO(1L, "viza", Categorie.PROCEDURE);
		this.mockMvc.perform(put("/taches/update")

				.content(asJsonString(tacheMissionDTO)).contentType(MediaType.APPLICATION_JSON)
				.accept(MediaType.APPLICATION_JSON))

				.andExpect(status().isOk());
	}

	public static String asJsonString(final Object obj) throws JsonProcessingException {

		final ObjectMapper mapper = new ObjectMapper();
		final String jsonContent = mapper.writeValueAsString(obj);
		return jsonContent;

	}

	@WithMockUser(roles = "COLLABORATEUR")

	@Test
	void testFindMissionByUtilisateur() throws Exception {
		this.mockMvc.perform(get("/taches/1")).andExpect(status().isOk());
	}

	@WithMockUser(roles = "COLLABORATEUR")

	@Test
	void testGetTacheCollaborateur() throws Exception {
		this.mockMvc.perform(get("/tachesCollaborateur/1")).andExpect(status().isOk());
	}

	@WithMockUser(roles = "COLLABORATEUR")
	@Test
	void testGetTacheCollaborateurPriorite() throws Exception {
		this.mockMvc.perform(get("/tachesCollaborateurPriorite/1")).andExpect(status().isOk());
	}

	@WithMockUser(roles = "BORH")
	@Test
	void testDeleteTache() throws Exception {
		this.mockMvc.perform(delete("/tache/2")).andExpect(status().isOk());
	}

}
