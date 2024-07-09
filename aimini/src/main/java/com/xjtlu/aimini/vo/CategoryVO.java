package com.xjtlu.aimini.vo;

import com.xjtlu.aimini.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryVO {

    private long id;

    private String name;

    private String description;

    private List<Product> productList;

}
