package com.example.grocerystoremanagement.service;

import com.example.grocerystoremanagement.moduls.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupplierRepositoy extends JpaRepository<Supplier,Long> {
    Supplier findByPhoneNumber(String phone);
}
