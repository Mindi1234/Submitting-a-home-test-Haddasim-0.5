package com.example.grocerystoremanagement.service;

import com.example.grocerystoremanagement.moduls.Order;
import com.example.grocerystoremanagement.moduls.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order,Long> {
    List<Order> findAllOrdersBySupplierId(long id);

}
