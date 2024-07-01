package com.xjtlu.aimini.service;

import com.xjtlu.aimini.entity.User;

import java.util.List;

public interface UserService {

    boolean exist(User u);

//    储存新用户
    int saveUser(User u);

//    获取用户信息
    User getUser(long id);

//    通过用户名获得用户id
    long getUserId(String username);

//    获取和修改用户具体信息
//    change and get method of [username, password, email, gender, grade, major].

//    编辑用户信息
    int editUser(User u);


}
