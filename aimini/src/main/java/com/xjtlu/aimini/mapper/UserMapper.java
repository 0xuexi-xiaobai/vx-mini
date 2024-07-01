package com.xjtlu.aimini.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.xjtlu.aimini.entity.User;
import org.apache.ibatis.annotations.Update;

import java.util.List;


public interface UserMapper extends BaseMapper<User> {

    //    查询全部用户
    List<User> getUserList();

    //    根据id在数据库里查询用户
    //    两种连接mysql的方法：
    //优先从缓存获取
    User findUserById(int id);
//    User findById(@Param("id") int userId);

    //    更新用户信息
    int updateUser(User u);

    Integer getThumbNum(int blog_id);

    //    删除用户
    int deleteUser(User u);

    //    增加文章点赞数量
    @Update("update user set like_blog = like_blog + 1 where id=#{user_id}")
    int addLikeNum(int user_id);

    //    减少文章点赞数量
    @Update("update user set like_blog = like_blog - 1 where id=#{user_id}")
    int reduceLikeNum(int user_id);

    //    增加用户收藏数量
    int addCollectNum(int user_id);

    //    减少文章收藏数量
    int reduceCollectNum(int user_id);


}
