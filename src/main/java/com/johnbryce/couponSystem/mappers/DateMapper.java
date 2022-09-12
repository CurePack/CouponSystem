package com.johnbryce.couponSystem.mappers;

import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Component
public class DateMapper {
    public Timestamp toTimestamp(LocalDateTime localDateTime) { return Timestamp.valueOf(localDateTime); }

    public LocalDateTime toLocalDateTime(Timestamp timestamp) { return timestamp.toLocalDateTime(); }
}
