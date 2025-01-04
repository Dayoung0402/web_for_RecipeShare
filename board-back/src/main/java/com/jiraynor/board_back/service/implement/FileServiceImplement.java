package com.jiraynor.board_back.service.implement;

import java.io.File;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.jiraynor.board_back.entity.ImageEntity;
import com.jiraynor.board_back.repository.ImageRepository;
import com.jiraynor.board_back.service.FileService;

@Service
public class FileServiceImplement implements FileService {

    @Value("${file.path}")
    private String filePath;
    @Value("${file.url}")
    private String fileUrl;

    @Autowired
private ImageRepository imageRepository;

@Override
public String upload(MultipartFile file, Integer boardNumber) {
    if (file.isEmpty()) {
        return null;
    }

    String originalFileName = file.getOriginalFilename();
    String extension = originalFileName.substring(originalFileName.lastIndexOf("."));
    String uuid = UUID.randomUUID().toString();
    String saveFileName = uuid + extension;
    String savePath = filePath + saveFileName;

    try {
        // 1. 파일 저장
        file.transferTo(new File(savePath));

        // 2. 데이터베이스에 저장
        ImageEntity imageEntity = new ImageEntity(boardNumber, fileUrl + saveFileName);
        imageRepository.save(imageEntity);

    } catch (Exception exception) {
        exception.printStackTrace();
        return null;
    }

    // 3. 저장된 파일 URL 반환
    return fileUrl + saveFileName;
}


    @Override
    public Resource getImage(String fileName) {

        Resource resource = null;

        try {
            resource = new UrlResource("file:" + filePath + fileName);
        } catch (Exception exception) {
            exception.printStackTrace();
            return null;
        }

        return resource;

    }

}
