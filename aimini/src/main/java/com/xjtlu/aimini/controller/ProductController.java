package com.xjtlu.aimini.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.xjtlu.aimini.entity.Product;
import com.xjtlu.aimini.entity.Result;
import com.xjtlu.aimini.service.Impl.ProductServiceImpl;
import com.xjtlu.aimini.service.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
            Result res = Result.success("产品已存在", product.getId());
            return JSON.toJSONString(res);
        }
        int succ = productService.addProduct(product);
        if (succ == 1) {
            Result res = Result.success("注册成功，", product.getId());
            return JSON.toJSONString(res);
        }else {
            Result res = Result.success( "注册失败，", product.getName());
            return JSON.toJSONString(res);
        }
    }

    @GetMapping("/getProductList")
    public String getProductList(@RequestBody String json) {
        Product product = JSON.parseObject(json, Product.class);
        List<Product> productList = productService.getProductList(product);
        Result res = Result.success("查询产品成功", productList);
        return JSON.toJSONString(res);
    }

    @PostMapping("/updateProduct")
    public String updateProduct(@RequestBody String json) {
        Product product = JSON.parseObject(json, Product.class);
        boolean exist = productService.exist(product);
        if (!exist) {
            Result res = Result.fail("分类不存在");
            return JSON.toJSONString(res);
        }
        int succ = productService.updateProduct(product);
        if (succ == 1) {
            Result res = Result.success("更新分类成功");
            return JSON.toJSONString(res);
        }else {
            Result res = Result.fail("分类不存在");
            return JSON.toJSONString(res);
        }
    }

    @DeleteMapping("/deleteProduct")
    public String deleteProduct(@RequestParam long id) {
        boolean exist = productService.exist(Product.builder().id(id).build());
        if (!exist) {
            Result res = Result.fail("分类不存在");
            return JSON.toJSONString(res);
        }
        int succ = productService.deleteProduct(id);
        if (succ == 1) {
            Result res = Result.success("删除分类成功");
            return JSON.toJSONString(res);
        }else {
            Result res = Result.fail("删除分类失败");
            return JSON.toJSONString(res);
        }
    }



}
