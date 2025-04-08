package com.example.grocerystoremanagement.controllers;


import com.example.grocerystoremanagement.moduls.GroceryStoreManager;
import com.example.grocerystoremanagement.moduls.Order;
import com.example.grocerystoremanagement.moduls.Product;
import com.example.grocerystoremanagement.moduls.Supplier;
import com.example.grocerystoremanagement.service.ProductRepository;
import com.example.grocerystoremanagement.service.SupplierRepositoy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin
@RequestMapping("api/supplier")
@RestController

public class SupplierController {
    @Autowired
    private SupplierRepositoy supplierRepositoy;
    private ProductRepository productRepository;
    public SupplierController(SupplierRepositoy supplierRepositoy , ProductRepository productRepository) {
        this.supplierRepositoy = supplierRepositoy;
        this.productRepository = productRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<Supplier> login(@RequestBody Supplier supplier) throws IOException{
        Supplier user = supplierRepositoy.findByPhoneNumber(supplier.getPhoneNumber());
        if(user==null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }



    @PostMapping("/signup")
    public ResponseEntity<Supplier> signup(@RequestBody Supplier supplier) throws IOException {
        Supplier user = supplierRepositoy.findByPhoneNumber(supplier.getPhoneNumber());
        if(user==null){
            if (supplier.getProducts() != null) {
            List<Product> attachedProducts = new ArrayList<>();
            for (Product product : supplier.getProducts()) {
                Product existingProduct = productRepository.findById(product.getId())
                        .orElseThrow(() -> new RuntimeException("Product not found with id: " + product.getId()));
                attachedProducts.add(existingProduct);
            }
            supplier.setProducts(attachedProducts);}
            else {
                supplier.setProducts(new ArrayList<>());
            }
            supplierRepositoy.save(supplier);
            return new ResponseEntity<>(supplier, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.CONFLICT);
    }


    @GetMapping("/getSupplierById/{id}")
    public ResponseEntity<Supplier> getSupplierById(@PathVariable Long id) throws IOException {
        Supplier supplier = supplierRepositoy.findById(id).get();
        if(supplier==null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(supplier, HttpStatus.OK);
    }



    @GetMapping("/getAllSupplier")
    public ResponseEntity<List<Supplier>> getAllSupplier() throws IOException {
        List<Supplier> suppliers = supplierRepositoy.findAll();
        if(suppliers==null){
            return  new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(suppliers, HttpStatus.OK);
    }

}
