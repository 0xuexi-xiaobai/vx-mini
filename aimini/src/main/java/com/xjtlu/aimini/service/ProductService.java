package com.xjtlu.aimini.service;

import com.xjtlu.aimini.entity.Product;

import java.util.List;

public interface ProductService {

    boolean exist(Product u);

//    储存新产品
    int saveProduct(Product u);

//    获取产品信息
    Product getProduct(long id);

    List<List<Product>> getProductList(int page, int pageSize);

//    通过产品名获得产品id
    long getProductId(String productName);

//    获取和修改产品具体信息
//    change and get method of [productName, password, email, gender, grade, major].

//    编辑产品信息
    int editProduct(Product u);
}
