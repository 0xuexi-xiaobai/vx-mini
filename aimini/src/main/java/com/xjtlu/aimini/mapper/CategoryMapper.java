package com.xjtlu.aimini.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.xjtlu.aimini.entity.Category;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CategoryMapper extends BaseMapper<Category> {


    List<Category> pageQuery(int limit, int offset);

}
