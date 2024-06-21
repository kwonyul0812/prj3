package com.backend.mapper.promotion;

import com.backend.domain.promotion.Promotion;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface PromotionMapper {

    @Insert("""
            INSERT INTO promo
            (id, title, eventType, eventStartDate, eventEndDate, content)
            VALUES (#{id}, #{title}, #{eventType}, #{eventStartDate}, #{eventEndDate}, #{content})
            """)
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insertPromo(Promotion promotion);

    @Select("""
            SELECT *
            FROM promo
            ORDER BY id DESC
            """)
    List<Promotion> selectList();

    @Select("""
            SELECT *
            FROM promo
            WHERE id = #{id}
            """)
    Promotion selectById(Integer id);

    @Delete("""
            DELETE FROM promo
            WHERE id = #{id}
            """)
    int deleteById(Integer id);

    @Update("""
            UPDATE promo
            SET title = #{title},
                eventType = #{eventType},
                eventStartDate = #{eventStartDate},
                eventEndDate = #{eventEndDate},
                content = #{content}
            WHERE id = #{id}
            """)
    int update(Promotion promotion);

    @Insert("""
            INSERT INTO promo_file (promo_id, name)
            VALUES (#{promoId}, #{name})
            """)
    int insertFileName(Integer promoId, String name);

    @Select("""
            SELECT name
            FROM promo_file
            WHERE promo_id=#{promoId}
            """)
    List<String> selectFileNameByPromoId(Integer promoId);

    @Delete("""
            DELETE FROM promo_file
            WHERE promo_id=#{promoId}
            """)
    int deleteFileByPromoId(Integer promoId);

    @Delete("""
            DELETE FROM promo_file
            WHERE promo_id=#{promoId}
              AND name=#{fileName}
            """)
    int deleteFileByPromoIdAndName(Integer promoId, String fileName);

    @Select("""
            SELECT COUNT(*)
            FROM promo
            WHERE eventEndDate >= CURRENT_DATE
            AND eventType = #{type}
            AND (title LIKE CONCAT('%', #{search}, '%') OR content LIKE CONCAT('%', #{search}, '%'))
            """)
    Integer countAllExcludingEnded(String type, String search);

    @Select("""
            SELECT *
            FROM promo
            WHERE eventEndDate >= CURRENT_DATE
            AND eventType = #{type}
            AND (title LIKE CONCAT('%', #{search}, '%') OR content LIKE CONCAT('%', #{search}, '%'))
            ORDER BY id DESC
            LIMIT #{offset}, #{pageSize}
            """)
    List<Promotion> selectAllPagingExcludingEnded(Integer offset, Integer pageSize, String type, String search);

    @Select("""
            SELECT COUNT(*)
            FROM promo
            WHERE eventEndDate < CURRENT_DATE
            AND (title LIKE CONCAT('%', #{search}, '%') OR content LIKE CONCAT('%', #{search}, '%'))
            """)
    Integer countAllEnded(String search);

    @Select("""
            SELECT *
            FROM promo
            WHERE eventEndDate < CURRENT_DATE
            AND (title LIKE CONCAT('%', #{search}, '%') OR content LIKE CONCAT('%', #{search}, '%'))
            ORDER BY id DESC
            LIMIT #{offset}, #{pageSize}
            """)
    List<Promotion> selectAllPagingEnded(Integer offset, Integer pageSize, String search);

    @Select("""
            SELECT COUNT(*)
            FROM promo
            WHERE title LIKE CONCAT('%', #{search}, '%') OR content LIKE CONCAT('%', #{search}, '%')
            """)
    Integer countAll(String search);

    @Select("""
            SELECT *
            FROM promo
            WHERE title LIKE CONCAT('%', #{search}, '%') OR content LIKE CONCAT('%', #{search}, '%')
            ORDER BY id DESC
            LIMIT #{offset}, #{pageSize}
            """)
    List<Promotion> selectAllPaging(Integer offset, Integer pageSize, String search);

    @Select("""
        SELECT *
        FROM promo
        WHERE title LIKE CONCAT('%', #{search}, '%') OR content LIKE CONCAT('%', #{search}, '%')
        ORDER BY id DESC
        """)
    List<Promotion> selectAllWithoutPaging(String search);
}

