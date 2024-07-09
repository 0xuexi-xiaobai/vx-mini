package com.xjtlu.aimini.service.Impl;


import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.xjtlu.aimini.entity.Product;
import com.xjtlu.aimini.entity.Result;
import com.xjtlu.aimini.mapper.ProductMapper;
import com.xjtlu.aimini.util.AliOssUtil;
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
public class ProductServiceImpl {

    @Resource
    private ProductMapper productMapper;

    @Resource
    private AliOssUtil aliOssUtil;

    public boolean exist(Product product) {
        return productMapper.exists(new QueryWrapper<>(product));
    }

    public int addProduct(Product product) {
        product.setCreatedAt(LocalDateTime.now());
        return productMapper.insert(product);
    }

    public List<Product> getProductList(Product product){
        List<Product> productList = productMapper.selectList(new QueryWrapper<>(product));
        return productList;
    }

    public int updateProduct(Product product) {
        return productMapper.updateById(product);
    }

    private int uploadImage(MultipartFile file) {
        log.info("文件上传：{}",file);

        try {
            //原始文件名
            String originalFilename = file.getOriginalFilename();
            //截取原始文件名的后缀
            String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            //构造新文件名称
            String objectName = UUID.randomUUID() + extension;
            //文件的请求路径
            String filePath = aliOssUtil.upload(file.getBytes(), objectName);
            return 1;
        } catch (IOException e) {
            log.error("文件上传失败：{}", e);
        }

        return 2;
    }

    public int deleteProduct(long id) {
        return productMapper.deleteById(id);
    }
}
