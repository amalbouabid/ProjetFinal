package com.thp.spring.projetfinal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.thp.spring.projetfinal.entities.MissionEntity;

@Repository
public interface MissionRepository extends JpaRepository<MissionEntity, Long> {
	public MissionEntity findByDescription(String description);

	public List<MissionEntity> findByCollaborateurId(Long idUtilisateur);

	public MissionEntity findByCollaborateurManagerId(Long idManager);
	
	@Query( value="SELECT *  FROM mission m INNER JOIN  mission_taches_mission mt on mt.id_mission = m.id_mission INNER JOIN tache_mission tm on tm.id_tachesmission = mt.id_tachemission where mt.id_tachemission =?1", nativeQuery = true)
	public MissionEntity findMissionUser(Long id);
	
}
