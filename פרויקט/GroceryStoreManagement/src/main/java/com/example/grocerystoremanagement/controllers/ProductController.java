package com.example.grocerystoremanagement.controllers;


import com.example.grocerystoremanagement.moduls.Product;
import com.example.grocerystoremanagement.moduls.Supplier;
import com.example.grocerystoremanagement.service.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@CrossOrigin
@RequestMapping("api/product")
@RestController

public class ProductController {
    @Autowired
    private ProductRepository productRepository;
    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping("/getAllProductsBySupplierId/{id}")
    public ResponseEntity<List<Product>> getAllProductsBySupplierId(@PathVariable Long id) throws IOException {
        List<Product> products = productRepository.findAllBySupplierId(id);
        if (products.isEmpty()) {
            return  new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @PostMapping("/addProduct")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) throws IOException {
        Product product1 = productRepository.findByProductName(product.getProductName());
        if (product1 != null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        product.setOrder(null);
        productRepository.save(product);
        return new ResponseEntity<>(product, HttpStatus.CREATED);
    }

    @GetMapping("/getAllProducts")
    public ResponseEntity<List<Product>> getAllProducts() throws IOException {
        List<Product> products = productRepository.findAll();
        if (products.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(products, HttpStatus.OK);
    }
}
