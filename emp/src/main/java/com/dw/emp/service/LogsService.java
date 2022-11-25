package com.dw.emp.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dw.emp.mapper.LogsMapper;
import com.dw.emp.vo.LogsVO;
import com.github.pagehelper.PageHelper;

@Service
public class LogsService {

	
	@Autowired
	private LogsMapper logsMapper;
	
	//접속정보 전체 조회
	public List<Map<String, Object>> getLogsPageList(int page){
		int pageSize = 10;
		PageHelper.startPage(page, pageSize);
		return logsMapper.selectLogs();
	}
	
	//접속정보 상세 조회
	public LogsVO getLogs(int logId) {
		return logsMapper.selectLogsByLogId(logId);
	}
}
