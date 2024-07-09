package com.xjtlu.aimini.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import lombok.*;
import org.springframework.stereotype.Component;

//产品
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Component
@Data
@Builder
@TableName("user")
public class Product {

    private Long id;

    private String name;

    private String description;

    //图片链接
    private String imageUrl;

    //所属产品分类
    private String cateId;

    //产品链接
    private String url;
}
