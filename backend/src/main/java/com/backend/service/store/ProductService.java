package com.backend.service.store;

import com.backend.domain.store.Product;
import com.backend.mapper.store.ImageMapper;
import com.backend.mapper.store.ProductMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@Service
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class ProductService {

    private final ProductMapper mapper;
    private final ImageMapper imageMapper;

    public void add(Product product, MultipartFile[] files) throws Exception {

        mapper.add(product);

        if (files != null) {
            for (MultipartFile file : files) {

                String dir = STR."/Users/igyeyeong/Desktop/Store/ProductImage/\{product.getId()}";
                File dirFile = new File(dir);
                if (!dirFile.exists()) {
                    dirFile.mkdirs();
                }


                String path = STR."/Users/igyeyeong/Desktop/Store/ProductImage/\{product.getId()}/\{file.getOriginalFilename()}";
                File destination = new File(path);
                file.transferTo(destination);
                imageMapper.add(product.getId(), file.getOriginalFilename(), path);
            }


        }


    }
}