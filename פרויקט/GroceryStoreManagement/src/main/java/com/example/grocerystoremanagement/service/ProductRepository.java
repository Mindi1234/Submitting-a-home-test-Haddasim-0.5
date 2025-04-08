package com.example.grocerystoremanagement.service;

import com.example.grocerystoremanagement.moduls.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product,Long> {
    List<Product> findAllBySupplierId(Long id);

    Product findByProductName(String productName);
    List<Product> findProductsByOrderId(Long id);
}
