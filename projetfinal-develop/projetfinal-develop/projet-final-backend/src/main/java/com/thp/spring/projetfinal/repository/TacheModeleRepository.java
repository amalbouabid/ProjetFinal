package com.thp.spring.projetfinal.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.thp.spring.projetfinal.entities.TacheModeleEntity;

public interface TacheModeleRepository extends JpaRepository<TacheModeleEntity, Long> {

	public TacheModeleEntity findTaskModeleByNom(String nom);
}
