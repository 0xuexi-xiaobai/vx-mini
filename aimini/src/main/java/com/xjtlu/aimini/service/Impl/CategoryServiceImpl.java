package com.xjtlu.aimini.service.Impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.xjtlu.aimini.entity.Category;
import com.xjtlu.aimini.entity.Product;
import com.xjtlu.aimini.mapper.CategoryMapper;
import com.xjtlu.aimini.mapper.ProductMapper;
import com.xjtlu.aimini.vo.CategoryVO;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class CategoryServiceImpl {

    @Resource
    private CategoryMapper categoryMapper;
    @Autowired
    private ProductMapper productMapper;

    public boolean exist(Category category) {
        return categoryMapper.exists(new QueryWrapper<>(category));
    }

    public List<CategoryVO> getCategoryList(int page, int pageSize) {
        List<Category> cats = categoryMapper.pageQuery(pageSize, pageSize * (page - 1));
        List<CategoryVO> categoryList = new ArrayList<>();
        for (Category cat : cats) {
            CategoryVO categoryVO = CategoryVO.builder()
                    .id(cat.getId())
                    .description(cat.getDescription())
                    .name(cat.getName())
                    .productList(productMapper.selectByMap(Map.of("cate_id", cat.getId())))
                    .build();
            categoryList.add(categoryVO);
        }
        return categoryList;
    }

    public int addCategory(Category category) {
        category.setCreatedAt(LocalDateTime.now());
        return categoryMapper.insert(category);
    }

    public int updateCategory(Category category) {
        return categoryMapper.updateById(category);
    }

    public int deleteCategory(long id) {
        return categoryMapper.deleteById(id);
    }
}
