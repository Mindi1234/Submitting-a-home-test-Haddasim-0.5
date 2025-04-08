package com.example.grocerystoremanagement.controllers;


import com.example.grocerystoremanagement.moduls.GroceryStoreManager;
import com.example.grocerystoremanagement.moduls.Order;
import com.example.grocerystoremanagement.moduls.Status;
import com.example.grocerystoremanagement.moduls.Supplier;
import com.example.grocerystoremanagement.service.GroceryStoreManagerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import static com.example.grocerystoremanagement.moduls.Status.*;

@CrossOrigin
@RequestMapping("api/manager")
@RestController
public class GroceryStoreManagerController {
    @Autowired
     private GroceryStoreManagerRepository storeManagerRepository;
     public GroceryStoreManagerController(GroceryStoreManagerRepository storeManagerRepository) {
         this.storeManagerRepository = storeManagerRepository;
     }


    @GetMapping("/getAllOrders/{id}")
    public ResponseEntity<List<Order>> getAllOrders(@PathVariable  Long id) throws IOException {
         GroceryStoreManager manager = storeManagerRepository.findById(id).get();
         List<Order> orders= manager.getOrders();
         if(orders==null){
             new ResponseEntity<>(HttpStatus.NOT_FOUND);
         }
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @GetMapping("/getAllOrdersThatCompleted/{id}")
    public ResponseEntity<List<Order>> getAllOrdersThatCompleted(@PathVariable  Long id) throws IOException {
        GroceryStoreManager manager = storeManagerRepository.findById(id).get();
        List<Order> orders= manager.getOrders();
        orders= orders.stream()
                .filter(order -> order.getStatus() == Status.completed)
                .collect(Collectors.toList());
        if(orders==null){
            new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }




    @PostMapping("/login")
    public ResponseEntity<GroceryStoreManager> login(@RequestBody GroceryStoreManager manager) throws IOException{
         GroceryStoreManager manager1 = storeManagerRepository.findByPhoneNumber(manager.getPhoneNumber());
        if (manager.getPhoneNumber().equals("0527644235")){
            return new ResponseEntity<>(manager1, HttpStatus.OK);
        }
        return new ResponseEntity<>(manager1,HttpStatus.NOT_FOUND);

    }
    @GetMapping("getAll")
    public ResponseEntity<List<GroceryStoreManager>> getAll() throws IOException {
         return new ResponseEntity<>(storeManagerRepository.findAll(), HttpStatus.OK);
    }





}
