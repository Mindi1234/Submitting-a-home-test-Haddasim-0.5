package com.example.grocerystoremanagement.controllers;


import com.example.grocerystoremanagement.moduls.Order;
import com.example.grocerystoremanagement.moduls.Product;
import com.example.grocerystoremanagement.moduls.Status;
import com.example.grocerystoremanagement.moduls.Supplier;
import com.example.grocerystoremanagement.service.OrderRepository;
import com.example.grocerystoremanagement.service.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static com.example.grocerystoremanagement.moduls.Status.*;

@CrossOrigin
@RequestMapping("api/order")
@RestController

public class OrderController {
    @Autowired
    private OrderRepository orderRepository;
    private ProductRepository productRepository;
    public OrderController(OrderRepository orderRepository , ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;

    }

    @PutMapping("/orderingProcess")
    public ResponseEntity<Order> orderSend(@RequestBody Order order) throws IOException {
        if(order.getStatus()==waiting){
            order.setStatus(Status.inProgress);
        }else{
            order.setStatus(Status.completed);
        }
        Order updatedOrder = orderRepository.save(order);
        return new ResponseEntity<>(updatedOrder, HttpStatus.OK);
    }

    @PostMapping("/addOrder")
    public ResponseEntity<Order> addOrder(@RequestBody Order order) throws IOException {
        List<Product> attachedProducts = new ArrayList<>();
        for (Product product : order.getProducts()) {
            Product existingProduct = productRepository.findById(product.getId())
                    .orElseThrow(() -> new RuntimeException("Product not found with id: " + product.getId()));
            attachedProducts.add(existingProduct);
        }
        order.setStatus(Status.waiting);
        LocalDate currentDate = LocalDate.now();
        order.setProducts(attachedProducts);
        order.setDate(currentDate);
        Order savedOrder = orderRepository.save(order);
        return new ResponseEntity<>(savedOrder, HttpStatus.OK);
    }


    @GetMapping("/getOrdersBySupplier/{id}")
    public ResponseEntity<List<Order>> getOrdersByManager(@PathVariable Long id) throws IOException {
        List<Order> orders = orderRepository.findAllOrdersBySupplierId(id);
        if(orders==null){
            new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }


}
