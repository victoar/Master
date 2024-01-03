import math


def problem1(a, b):
    if a == 10 or b == 10 or a + b == 10:
        return True
    return False

def problem2(n):
    s = (n * (n + 1))/2
    return s

def problem3(n):
    s = n * (n + 1)
    return s

def problem4(n):
    if math.sqrt(n) * math.sqrt(n) == n:
        return True
    return False

def problem5(n):
    if n == 0 or n == 1:
        return False

    for i in range(2, int(n/2)+1):
        if n % i == 0:
            return False
    return True

def problem6(n):
    for k in range(2, n):
        if problem5(k):
            print(k, end=' ')
    print()

def problem7(n):
    n = n - 1
    while not problem5(n) and n > 2:
        n = n - 1
    if n == 1 or n == 0:
        return None
    return n

def problem8(n, m):
    s = 0
    for k in range(n, m + 1):
        if problem5(k):
            s += k
    return s


if __name__ == '__main__':
    print(problem1(10, 20))
    print(problem2(5))
    print(problem3(4))
    print(problem4(16))
    print(problem5(4))
    problem6(25)
    print(problem7(23))
    print(problem8(4, 10))

