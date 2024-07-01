package com.xjtlu.aimini.service.Impl;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.xjtlu.aimini.entity.Product;
import com.xjtlu.aimini.mapper.ProductMapper;
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class ProductServiceImpl {

    @Resource
    private ProductMapper productMapper;

    public boolean exist(Product product) {
        return productMapper.exists(new QueryWrapper<>(product));
    }

    public int addProduct(Product product) {
        return productMapper.insert(product);
    }
}
