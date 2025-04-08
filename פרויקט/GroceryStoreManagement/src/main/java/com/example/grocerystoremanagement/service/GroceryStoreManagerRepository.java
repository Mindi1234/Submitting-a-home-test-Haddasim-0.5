package com.example.grocerystoremanagement.service;

import com.example.grocerystoremanagement.moduls.GroceryStoreManager;
import org.springframework.data.jpa.repository.JpaRepository;



public interface GroceryStoreManagerRepository extends JpaRepository<GroceryStoreManager,Long> {


    GroceryStoreManager findByPhoneNumber(String phoneNumber);


}
