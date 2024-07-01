package com.xjtlu.aimini.controller;

import com.alibaba.fastjson.JSON;
import com.xjtlu.aimini.entity.Product;
import com.xjtlu.aimini.entity.Result;
import com.xjtlu.aimini.service.Impl.ProductServiceImpl;
import com.xjtlu.aimini.service.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/product")
@Slf4j
public class ProductController {

    @Autowired
    private ProductServiceImpl productService;

    @PostMapping("/addProduct")
    public String addProduct(@RequestBody String json) {
        Product product = JSON.parseObject(json, Product.class);
        boolean exist = productService.exist(product);
        if (exist) {
            Result res = Result.create(300, "产品已存在", product.getName());
            return JSON.toJSONString(res);
        }
        int succ = productService.addProduct(product);
        if (succ == 1) {
            Result res = Result.create(200, "注册成功，", product.getName());
            return JSON.toJSONString(res);
        }else {
            Result res = Result.create(300, "注册失败，", product.getName());
            return JSON.toJSONString(res);
        }
    }
}
