package com.xjtlu.aimini.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.xjtlu.aimini.entity.Category;
import com.xjtlu.aimini.entity.Result;
import com.xjtlu.aimini.service.CategoryService;
import com.xjtlu.aimini.service.Impl.CategoryServiceImpl;
import com.xjtlu.aimini.vo.CategoryVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    private CategoryServiceImpl categoryService;

    @GetMapping("/getCategoryList")
    public String getCategoryList(@RequestBody String json) {
        JSONObject jsonObject = JSONObject.parseObject(json);
        int page = jsonObject.getInteger("page");
        int pageSize = jsonObject.getInteger("pageSize");
        List<CategoryVO> categoryList = categoryService.getCategoryList(page, pageSize);
        Result res = Result.success("获取分类列表成功", categoryList);
        return JSONObject.toJSONString(res);
    }

    @PostMapping("/addCategory")
    public String addCategory(@RequestBody String json) {
        Category category = JSONObject.parseObject(json, Category.class);
        boolean exist = categoryService.exist(category);
        if (exist) {
            String msg = "分类: " + category.getName() + " 已存在";
            Result res = Result.fail(msg);
            return JSON.toJSONString(res);
        }
        int succ = categoryService.addCategory(category);
        if (succ == 1) {
            Result res = Result.success("新增分类成功");
            return JSONObject.toJSONString(res);
        }else {
            Result res = Result.fail("新增分类失败");
            return JSONObject.toJSONString(res);
        }
    }

    @PostMapping("/updateCategory")
    public String updateCategory(@RequestBody String json) {
        Category category = JSON.parseObject(json, Category.class);
        boolean exist = categoryService.exist(category);
        if (!exist) {
            Result res = Result.fail("分类不存在");
            return JSON.toJSONString(res);
        }
        int succ = categoryService.updateCategory(category);
        if (succ == 1) {
            Result res = Result.success("更新分类成功");
            return JSON.toJSONString(res);
        }else {
            Result res = Result.fail("更新分类失败");
            return JSON.toJSONString(res);
        }
    }

    @PostMapping("/deleteCategory")
    public String deleteCategory(@RequestParam long id) {
        int succ = categoryService.deleteCategory(id);
        boolean exist = categoryService.exist(Category.builder().id(id).build());
        if (!exist) {
            Result res = Result.fail("分类不存在");
            return JSON.toJSONString(res);
        }
        if (succ == 1) {
            Result res = Result.success("删除分类成功");
            return JSON.toJSONString(res);
        }else {
            Result res = Result.fail("删除分类失败");
            return JSON.toJSONString(res);
        }
    }
}
