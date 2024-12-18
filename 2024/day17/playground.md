B = A % 8
B = B ^ 3
C = A / 2^B
B = B ^ 5
A = A / 2^3
B = B ^ C
OUT(B)
pc = 0 if A != 0 else terminate

