package com.johnbryce.couponSystem.mappers;

import java.util.List;

public interface Mapper <DAO,DTO> {
    DAO toDao(DTO dto);
    DTO toDto(DAO dao);

    List<DAO> toDaoList(List<DTO> dtos);
    List<DTO> toDtoList(List<DAO> daos);
}
