INSERT INTO role(
	id, libelle)
	VALUES (1, 'COLLABORATEUR');
	INSERT INTO role(
	id, libelle)
	VALUES (2, 'MANAGER');
	INSERT INTO utilisateur(
	id, adresse, cin, code_postal, mail, mot_de_passe, nom, prenom, pseudo, tel, ville, role_id)
	VALUES (1, 'tunis', 'tunis', 'tunis', 'tunis', 'tunis', 'tunis', 'hajer', 'hajer', '59', 'tunis', 2);
	INSERT INTO utilisateur(
	id, adresse, cin, code_postal, mail, mot_de_passe, nom, prenom, pseudo, tel, ville, manager_id, role_id)
	VALUES (2, 'tunis', 'tunis', 'tunis', 'tunis', 'tunis', 'tunis', 'moez', 'moez', '55', 'tunis', 1, 1);
	INSERT INTO utilisateur(
	id, adresse, cin, code_postal, mail, mot_de_passe, nom, prenom, pseudo, tel, ville, role_id)
	VALUES (3, 'tunis', 'tunis', 'tunis', 'tunis', 'tunis', 'tunis', 'ali', 'ali', '59', 'tunis', 2);
	INSERT INTO task(
	id, categorie, commentaire, date_echeance, date_validite, fichier, nom, priorite, status, validite, role_id)
	VALUES (1, 'DOCUMENT','com', null, null, null, 'nom', 'p0', 'TODO', null, 1);
			INSERT INTO task(
	id, categorie, commentaire, date_echeance, date_validite, fichier, nom, priorite, status, validite)
	VALUES (2, 'DOCUMENT','com2', null, null, null, 'nom2', 'p0', 'TODO', null);
	
	INSERT INTO model(
	id, description, designation, type)
	VALUES (1, 'desc', 'desi', 'LONG_SEJOUR');
	
		INSERT INTO model(
	id, description, designation, type)
	VALUES (2, 'desc1', 'desi1', 'LONG_SEJOUR');
	INSERT INTO model_task_models(
	modele_entity_id, task_models_id)
	VALUES (1, 1);
	INSERT INTO tache_mission(
	id_tachesmission, categorie, commentaire, date_affectation, date_echeance, date_validation, description, nom, priorite, status, utilisateur_id)
	VALUES (1, 'DOCUMENT', 'com', null, null, null, 'desc', 'mis', 'p0', 'DONE', 1);
	INSERT INTO mission(
	id_mission, date_debut, date_fin, description, status, collaborateur_id, model)
	VALUES (1, null, null, 'desc', 'TODO', 2, 1);
	INSERT INTO mission_taches_mission(
	id_mission, id_tachemission)
	VALUES (1, 1);

