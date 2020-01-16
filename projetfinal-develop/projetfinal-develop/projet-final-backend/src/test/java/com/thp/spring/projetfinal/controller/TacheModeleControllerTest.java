package com.thp.spring.projetfinal.controller;

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
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
import com.thp.spring.projetfinal.dto.TacheModeleDTO;
import com.thp.spring.projetfinal.service.TacheModeleService;
import com.thp.spring.projetfinal.util.Priorite;
import com.thp.spring.projetfinal.util.Statut;
@Transactional
@Rollback(true)
@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
class TacheModeleControllerTest {
	@MockBean
	private TacheModeleService tacheModele;
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
	void testAjouterTaskModele() throws Exception {
		this.mockMvc.perform(post("/taskModele")

				.content(asJsonString(new TacheModeleDTO(2L, "modele3", Priorite.p0, Statut.DOING)))
				.contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON))

				.andExpect(status().isOk());

	}

	public static String asJsonString(final Object obj) throws JsonProcessingException {

			final ObjectMapper mapper = new ObjectMapper();
			final String jsonContent = mapper.writeValueAsString(obj);
			return jsonContent;
		
		}
	

	@WithMockUser(roles = "COLLABORATEUR")
	@Test
	void testAfficherTasks() throws Exception {
		this.mockMvc.perform(get("/taskModele")).andExpect(status().isOk());
	}

	@WithMockUser(roles = "COLLABORATEUR")
	@Test
	void testGetModel() throws Exception {
		this.mockMvc.perform(get("/taskModele/1")).andExpect(status().isOk());
	}


}
