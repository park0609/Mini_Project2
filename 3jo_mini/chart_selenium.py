from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import time

import json 

import matplotlib.font_manager as fm
from matplotlib import rc
import matplotlib.pyplot as plt

# json 형태로 저장
def save_chart_json(filename, years, written_rates, practical_rates, title):
    data = {
        "title": title,
        "years": years,
        "필기 합격률": written_rates,
        "실기 합격률": practical_rates
    }

    with open(f'ChartFolder/{filename}', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

# 정보처리기사
def chart_1():
    options = Options()
    options.binary_location = "chrome-win64/chrome-win64/chrome.exe" # 크롬브라우저 경로
    service = Service("chromedriver.exe") # 크롬드라이브 경로
    driver = webdriver.Chrome(service=service, options=options)
    
    # 자격증 종목별 안내 페이지 열기
    driver.get("https://www.q-net.or.kr/crf005.do?gSite=Q&gId=#none")
    time.sleep(3)
    
    # 국가기술자격 탭
    tab1=driver.find_element(By.CSS_SELECTOR, "#PcType > div.qualList.qulList_lv1 > div > div > ul > li.level4.on > a")
    
    tab1.click()
    time.sleep(1.5)
    # 정보통신 탭
    tab2 = driver.find_element(By.CSS_SELECTOR, "#duty_step1_001 > ul > li:nth-child(21) > a")
    tab2.click()
    time.sleep(1.5)
    # 정보기술 탭
    tab3 = driver.find_element(By.CSS_SELECTOR, "#duty_step2_001_21 > ul > li:nth-child(1) > a")
    tab3.click()
    time.sleep(1.5)
    # 정보처리기사
    tab4 = driver.find_element(By.CSS_SELECTOR, "#\\31 320")
    tab4.click()
    time.sleep(1.5)
    # 기본정보
    tab5 = driver.find_element(By.CSS_SELECTOR, "#tab2")
    tab5.click()
    time.sleep(1.5)
    
    
    # 데이터 저장 리스트
    years = []
    written_rates = []
    practical_rates = []
    
    for i in range(1, 11):  # 10년치
        try:
            year = 2025 - i
            wtest = driver.find_element(By.CSS_SELECTOR, f"#tab2 > div > div > div > table > tbody > tr:nth-child({i}) > td:nth-child(4)")
            wtest_text = float(wtest.text.strip().replace('%',''))
            ptest = driver.find_element(By.CSS_SELECTOR, f"#tab2 > div > div > div > table > tbody > tr:nth-child({i}) > td:nth-child(7)")
            ptest_text = float(ptest.text.strip().replace('%',''))
    
            years.append(year)
            written_rates.append(wtest_text)
            practical_rates.append(ptest_text)
    
            print(f"[정보처리기사] {year}년 필기:{wtest_text}%, 실기:{ptest_text}%")
        except Exception as e:
            print(f"{year}년 데이터 수집 실패: {e}")
    
    driver.quit()
    
    years.reverse()
    written_rates.reverse()
    practical_rates.reverse()
    
    # JSON 파일로 저장
    save_chart_json(
    "정보처리기사_연도별합격률.json",
    years,
    written_rates,
    practical_rates,
    "정보처리기사 연도별 합격률 (2015 ~ 2024)"
    )
    plt.show()


# 정보처리산업기사
def chart_2():
    # 크롬 실행 설정
    options = Options()
    options.binary_location = "chrome-win64/chrome-win64/chrome.exe" # 크롬브라우저 경로
    service = Service("chromedriver.exe") # 크롬드라이브 경로
    driver = webdriver.Chrome(service=service, options=options)
    
    # 자격증 종목별 안내 페이지 열기
    driver.get("https://www.q-net.or.kr/crf005.do?gSite=Q&gId=#none")
    time.sleep(3)
    
    # 국가기술자격 탭
    tab1=driver.find_element(By.CSS_SELECTOR, "#PcType > div.qualList.qulList_lv1 > div > div > ul > li.level4.on > a")
    
    tab1.click()
    time.sleep(1.5)
    # 정보통신 탭
    tab2 = driver.find_element(By.CSS_SELECTOR, "#duty_step1_001 > ul > li:nth-child(21) > a")
    tab2.click()
    time.sleep(1.5)
    # 정보기술 탭
    tab3 = driver.find_element(By.CSS_SELECTOR, "#duty_step2_001_21 > ul > li:nth-child(1) > a")
    tab3.click()
    time.sleep(1.5)
    # 정보처리산업기사
    tab4 = driver.find_element(By.CSS_SELECTOR, "#\\32 290")
    tab4.click()
    time.sleep(1.5)
    # 기본정보
    tab5 = driver.find_element(By.CSS_SELECTOR, "#tab2")
    tab5.click()
    time.sleep(1.5)
    
    # 데이터 저장 리스트
    years = []
    written_rates = []
    practical_rates = []
    
    for i in range(1, 11):  # 10년치
        try:
            year = 2025 - i
            wtest = driver.find_element(By.CSS_SELECTOR, f"#tab2 > div > div > div > table > tbody > tr:nth-child({i}) > td:nth-child(4)")
            wtest_text = float(wtest.text.strip().replace('%',''))
            ptest = driver.find_element(By.CSS_SELECTOR, f"#tab2 > div > div > div > table > tbody > tr:nth-child({i}) > td:nth-child(7)")
            ptest_text = float(ptest.text.strip().replace('%',''))
    
            years.append(year)
            written_rates.append(wtest_text)
            practical_rates.append(ptest_text)
    
            print(f"[정보처리산업기사] {year}년 필기:{wtest_text}%, 실기:{ptest_text}%")
        except Exception as e:
            print(f"{year}년 데이터 수집 실패: {e}")
    
    driver.quit()
    
    years.reverse()
    written_rates.reverse()
    practical_rates.reverse()
    
    # JSON 파일로 저장
    save_chart_json(
    "정보처리산업기사_연도별합격률.json",
    years,
    written_rates,
    practical_rates,
    "정보처리산업기사 연도별 합격률 (2015 ~ 2024)"
    )
    plt.show()


# 정보기기운용기능사
def chart_3():
    # 크롬 실행 설정
    options = Options()
    options.binary_location = "chrome-win64/chrome-win64/chrome.exe" # 크롬브라우저 경로
    service = Service("chromedriver.exe") # 크롬드라이브 경로
    driver = webdriver.Chrome(service=service, options=options)
    
    # 자격증 종목별 안내 페이지 열기
    driver.get("https://www.q-net.or.kr/crf005.do?gSite=Q&gId=#none")
    time.sleep(3)
    
    # 국가기술자격 탭
    tab1=driver.find_element(By.CSS_SELECTOR, "#PcType > div.qualList.qulList_lv1 > div > div > ul > li.level4.on > a")
    
    tab1.click()
    time.sleep(1.5)
    # 정보통신 탭
    tab2 = driver.find_element(By.CSS_SELECTOR, "#duty_step1_001 > ul > li:nth-child(21) > a")
    tab2.click()
    time.sleep(1.5)
    # 정보기술 탭
    tab3 = driver.find_element(By.CSS_SELECTOR, "#duty_step2_001_21 > ul > li:nth-child(1) > a")
    tab3.click()
    time.sleep(1.5)
    # 정보기기운용기능사
    tab4 = driver.find_element(By.CSS_SELECTOR, "#\\36 892")
    tab4.click()
    time.sleep(1.5)
    # 기본정보
    tab5 = driver.find_element(By.CSS_SELECTOR, "#tab2")
    tab5.click()
    time.sleep(1.5)
    
    # 데이터 저장 리스트
    years = []
    written_rates = []
    practical_rates = []
    
    for i in range(1, 11):  # 10년치
        try:
            year = 2025 - i
            wtest = driver.find_element(By.CSS_SELECTOR, f"#tab2 > div > div > div > table > tbody > tr:nth-child({i}) > td:nth-child(4)")
            wtest_text = float(wtest.text.strip().replace('%',''))
            ptest = driver.find_element(By.CSS_SELECTOR, f"#tab2 > div > div > div > table > tbody > tr:nth-child({i}) > td:nth-child(7)")
            ptest_text = float(ptest.text.strip().replace('%',''))
    
            years.append(year)
            written_rates.append(wtest_text)
            practical_rates.append(ptest_text)
    
            print(f"[정보기기운용기능사] {year}년 필기:{wtest_text}%, 실기:{ptest_text}%")
        except Exception as e:
            print(f"{year}년 데이터 수집 실패: {e}")
    
    driver.quit()
    
    years.reverse()
    written_rates.reverse()
    practical_rates.reverse()
    
    # JSON 파일로 저장
    save_chart_json(
    "정보기기운용기능사_연도별합격률.json",
    years,
    written_rates,
    practical_rates,
    "정보기기운용기능사 연도별 합격률 (2015 ~ 2024)"
    )
    plt.show()


# 정보처리기능사
def chart_4():
    # 크롬 실행 설정
    options = Options()
    options.binary_location = "chrome-win64/chrome-win64/chrome.exe" # 크롬브라우저 경로
    service = Service("chromedriver.exe") # 크롬드라이브 경로
    driver = webdriver.Chrome(service=service, options=options)
    
    # 자격증 종목별 안내 페이지 열기
    driver.get("https://www.q-net.or.kr/crf005.do?gSite=Q&gId=#none")
    time.sleep(3)
    
    # 국가기술자격 탭
    tab1=driver.find_element(By.CSS_SELECTOR, "#PcType > div.qualList.qulList_lv1 > div > div > ul > li.level4.on > a")
    
    tab1.click()
    time.sleep(1.5)
    # 정보통신 탭
    tab2 = driver.find_element(By.CSS_SELECTOR, "#duty_step1_001 > ul > li:nth-child(21) > a")
    tab2.click()
    time.sleep(1.5)
    # 정보기술 탭
    tab3 = driver.find_element(By.CSS_SELECTOR, "#duty_step2_001_21 > ul > li:nth-child(1) > a")
    tab3.click()
    time.sleep(1.5)
    # 정보처리기능사
    tab4 = driver.find_element(By.CSS_SELECTOR, "#\\36 921")
    tab4.click()
    time.sleep(1.5)
    # 기본정보
    tab5 = driver.find_element(By.CSS_SELECTOR, "#tab2")
    tab5.click()
    time.sleep(1.5)
    
    
    # 데이터 저장 리스트
    years = []
    written_rates = []
    practical_rates = []
    
    for i in range(1, 11):  # 10년치
        try:
            year = 2025 - i
            wtest = driver.find_element(By.CSS_SELECTOR, f"#tab2 > div > div > div > table > tbody > tr:nth-child({i}) > td:nth-child(4)")
            wtest_text = float(wtest.text.strip().replace('%',''))
            ptest = driver.find_element(By.CSS_SELECTOR, f"#tab2 > div > div > div > table > tbody > tr:nth-child({i}) > td:nth-child(7)")
            ptest_text = float(ptest.text.strip().replace('%',''))
    
            years.append(year)
            written_rates.append(wtest_text)
            practical_rates.append(ptest_text)
    
            print(f"[정보처리기능사] {year}년 필기:{wtest_text}%, 실기:{ptest_text}%")
        except Exception as e:
            print(f"{year}년 데이터 수집 실패: {e}")
    
    driver.quit()
    
    years.reverse()
    written_rates.reverse()
    practical_rates.reverse()
    
    # JSON 파일로 저장
    save_chart_json(
    "정보처리기능사_연도별합격률.json",
    years,
    written_rates,
    practical_rates,
    "정보처리기능사 연도별 합격률 (2015 ~ 2024)"
    )
    plt.show()


# 정보관리기술사
def chart_5():
    # 크롬 실행 설정
    options = Options()
    options.binary_location = "chrome-win64/chrome-win64/chrome.exe" # 크롬브라우저 경로
    service = Service("chromedriver.exe") # 크롬드라이브 경로
    driver = webdriver.Chrome(service=service, options=options)
    
    # 자격증 종목별 안내 페이지 열기
    driver.get("https://www.q-net.or.kr/crf005.do?gSite=Q&gId=#none")
    time.sleep(3)
    
    # 국가기술자격 탭
    tab1=driver.find_element(By.CSS_SELECTOR, "#PcType > div.qualList.qulList_lv1 > div > div > ul > li.level4.on > a")
    
    tab1.click()
    time.sleep(1.5)
    # 정보통신 탭
    tab2 = driver.find_element(By.CSS_SELECTOR, "#duty_step1_001 > ul > li:nth-child(21) > a")
    tab2.click()
    time.sleep(1.5)
    # 정보기술 탭
    tab3 = driver.find_element(By.CSS_SELECTOR, "#duty_step2_001_21 > ul > li:nth-child(1) > a")
    tab3.click()
    time.sleep(1.5)
    # 정보관리기술사
    tab4 = driver.find_element(By.CSS_SELECTOR, "#\\30 601")
    tab4.click()
    time.sleep(1.5)
    # 기본정보
    tab5 = driver.find_element(By.CSS_SELECTOR, "#tab2")
    tab5.click()
    time.sleep(1.5)
    
    # 데이터 저장 리스트
    years = []
    written_rates = []
    practical_rates = []
    
    for i in range(1, 11):  # 10년치
        try:
            year = 2025 - i
            wtest = driver.find_element(By.CSS_SELECTOR, f"#tab2 > div > div > div > table > tbody > tr:nth-child({i}) > td:nth-child(4)")
            wtest_text = float(wtest.text.strip().replace('%',''))
            ptest = driver.find_element(By.CSS_SELECTOR, f"#tab2 > div > div > div > table > tbody > tr:nth-child({i}) > td:nth-child(7)")
            ptest_text = float(ptest.text.strip().replace('%',''))
    
            years.append(year)
            written_rates.append(wtest_text)
            practical_rates.append(ptest_text)
    
            print(f"[정보관리기술사] {year}년 필기:{wtest_text}%, 실기:{ptest_text}%")
        except Exception as e:
            print(f"{year}년 데이터 수집 실패: {e}")
    
    driver.quit()
    
    years.reverse()
    written_rates.reverse()
    practical_rates.reverse()
    
    # JSON 파일로 저장
    save_chart_json(
    "정보관리기술사_연도별합격률.json",
    years,
    written_rates,
    practical_rates,
    "정보관리기술사 연도별 합격률 (2015 ~ 2024)"
    )
    plt.show()


# 사무자동화산업기사
def chart_6():
    # 크롬 실행 설정
    options = Options()
    options.binary_location = "chrome-win64/chrome-win64/chrome.exe" # 크롬브라우저 경로
    service = Service("chromedriver.exe") # 크롬드라이브 경로
    driver = webdriver.Chrome(service=service, options=options)
    
    # 자격증 종목별 안내 페이지 열기
    driver.get("https://www.q-net.or.kr/crf005.do?gSite=Q&gId=#none")
    time.sleep(3)
    
    # 국가기술자격 탭
    tab1=driver.find_element(By.CSS_SELECTOR, "#PcType > div.qualList.qulList_lv1 > div > div > ul > li.level4.on > a")
    
    tab1.click()
    time.sleep(1.5)
    # 정보통신 탭
    tab2 = driver.find_element(By.CSS_SELECTOR, "#duty_step1_001 > ul > li:nth-child(21) > a")
    tab2.click()
    time.sleep(1.5)
    # 정보기술 탭
    tab3 = driver.find_element(By.CSS_SELECTOR, "#duty_step2_001_21 > ul > li:nth-child(1) > a")
    tab3.click()
    time.sleep(1.5)
    # 사무자동화산업기사
    tab4 = driver.find_element(By.CSS_SELECTOR, "#\\32 193")
    tab4.click()
    time.sleep(1.5)
    # 기본정보
    tab5 = driver.find_element(By.CSS_SELECTOR, "#tab2")
    tab5.click()
    time.sleep(1.5)
    
    # 데이터 저장 리스트
    years = []
    written_rates = []
    practical_rates = []
    
    for i in range(1, 11):  # 10년치
        try:
            year = 2025 - i
            wtest = driver.find_element(By.CSS_SELECTOR, f"#tab2 > div > div > div > table > tbody > tr:nth-child({i}) > td:nth-child(4)")
            wtest_text = float(wtest.text.strip().replace('%',''))
            ptest = driver.find_element(By.CSS_SELECTOR, f"#tab2 > div > div > div > table > tbody > tr:nth-child({i}) > td:nth-child(7)")
            ptest_text = float(ptest.text.strip().replace('%',''))
    
            years.append(year)
            written_rates.append(wtest_text)
            practical_rates.append(ptest_text)
    
            print(f"[사무자동화산업기사] {year}년 필기:{wtest_text}%, 실기:{ptest_text}%")
        except Exception as e:
            print(f"{year}년 데이터 수집 실패: {e}")
    
    driver.quit()
    
    years.reverse()
    written_rates.reverse()
    practical_rates.reverse()
    
    # JSON 파일로 저장
    save_chart_json(
    "사무자동화산업기사_연도별합격률.json",
    years,
    written_rates,
    practical_rates,
    "사무자동화산업기사_연도별 합격률 (2015 ~ 2024)"
    )
    plt.show()


# 컴퓨터시스템응용기술사
def chart_7():
    # 크롬 실행 설정
    options = Options()
    options.binary_location = "chrome-win64/chrome-win64/chrome.exe" # 크롬브라우저 경로
    service = Service("chromedriver.exe") # 크롬드라이브 경로
    driver = webdriver.Chrome(service=service, options=options)
    
    # 자격증 종목별 안내 페이지 열기
    driver.get("https://www.q-net.or.kr/crf005.do?gSite=Q&gId=#none")
    time.sleep(3)
    
    # 국가기술자격 탭
    tab1=driver.find_element(By.CSS_SELECTOR, "#PcType > div.qualList.qulList_lv1 > div > div > ul > li.level4.on > a")
    
    tab1.click()
    time.sleep(1.5)
    # 정보통신 탭
    tab2 = driver.find_element(By.CSS_SELECTOR, "#duty_step1_001 > ul > li:nth-child(21) > a")
    tab2.click()
    time.sleep(1.5)
    # 정보기술 탭
    tab3 = driver.find_element(By.CSS_SELECTOR, "#duty_step2_001_21 > ul > li:nth-child(1) > a")
    tab3.click()
    time.sleep(1.5)
    # 컴퓨터시스템응용기술사
    tab4 = driver.find_element(By.CSS_SELECTOR, "#\\30 622")
    tab4.click()
    time.sleep(1.5)
    # 기본정보
    tab5 = driver.find_element(By.CSS_SELECTOR, "#tab2")
    tab5.click()
    time.sleep(1.5)
    
    # 데이터 저장 리스트
    years = []
    written_rates = []
    practical_rates = []
    
    for i in range(1, 11):  # 10년치
        try:
            year = 2025 - i
            wtest = driver.find_element(By.CSS_SELECTOR, f"#tab2 > div > div > div > table > tbody > tr:nth-child({i}) > td:nth-child(4)")
            wtest_text = float(wtest.text.strip().replace('%',''))
            ptest = driver.find_element(By.CSS_SELECTOR, f"#tab2 > div > div > div > table > tbody > tr:nth-child({i}) > td:nth-child(7)")
            ptest_text = float(ptest.text.strip().replace('%',''))
    
            years.append(year)
            written_rates.append(wtest_text)
            practical_rates.append(ptest_text)
    
            print(f"[컴퓨터시스템응용기술사] {year}년 필기:{wtest_text}%, 실기:{ptest_text}%")
        except Exception as e:
            print(f"{year}년 데이터 수집 실패: {e}")
    
    driver.quit()
    
    years.reverse()
    written_rates.reverse()
    practical_rates.reverse()
    
    # JSON 파일로 저장
    save_chart_json(
    "컴퓨터시스템응용기술사_연도별합격률.json",
    years,
    written_rates,
    practical_rates,
    "컴퓨터시스템응용기술사_연도별 합격률 (2015 ~ 2024)"
    )
    plt.show()

# 전체실행
def run_all_charts():
    chart_1()
    chart_2()
    chart_3()
    chart_4()
    chart_5()
    chart_6()
    chart_7()

run_all_charts()