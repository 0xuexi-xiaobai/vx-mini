package com.xjtlu.aimini.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.xjtlu.aimini.entity.Product;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ProductMapper extends BaseMapper<Product> {


    void pageQuery();


}
