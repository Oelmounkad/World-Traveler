package com.oelmounkad.authentication.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.oelmounkad.authentication.models.ERole;
import com.oelmounkad.authentication.models.Role;

public interface RoleRepository extends MongoRepository<Role, String> {
	  Optional<Role> findByName(ERole name);
	}
