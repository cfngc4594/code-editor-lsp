import { SupportedLanguage } from "@/constants/language";

export const DEFAULT_VALUE: Record<SupportedLanguage, string> = {
    c: `#include <stdio.h>

#define ARR_LEN 7

void qsort(int v[], int left, int right);
void printArr(int v[], int len);

int main()
{
	int i;
	int v[ARR_LEN] = { 4, 3, 1, 7, 9, 6, 2 };
	printArr(v, ARR_LEN);
	qsort(v, 0, ARR_LEN-1);
	printArr(v, ARR_LEN);
	return 0;
}

void qsort(int v[], int left, int right)
{
	int i, last;
	void swap(int v[], int i, int j);

	if (left >= right)
		return;
	swap(v, left, (left + right) / 2);
	last = left;
	for (i = left+1; i <= right; i++)
		if (v[i] < v[left])
			swap(v, ++last, i);
	swap(v, left, last);
	qsort(v, left, last-1);
	qsort(v, last+1, right);
}

void swap(int v[], int i, int j)
{
	int temp;

	temp = v[i];
	v[i] = v[j];
	v[j] = temp;
}

void printArr(int v[], int len)
{
	int i;
	for (i = 0; i < len; i++)
		printf("%d ", v[i]);
	printf("\\n");
}`,
    cpp: `// Working of implicit type-conversion

#include <iostream>
using namespace std;

int main() {

   int num_int;
   double num_double = 9.99;

   // implicit conversion
   // assigning a double value to an int variable
   num_int = num_double;

   cout << "num_int = " << num_int << endl;
   cout << "num_double = " << num_double << endl;

   return 0;
}`,
    java: `import java.awt.Rectangle;

public class ObjectVarsAsParameters
{	public static void main(String[] args)
	{	go();
	}

	public static void go()
	{	Rectangle r1 = new Rectangle(0,0,5,5);
		System.out.println("In method go. r1 " + r1 + "\\n");
		// could have been
		//System.out.prinltn("r1" + r1.toString());
		r1.setSize(10, 15);
		System.out.println("In method go. r1 " + r1 + "\\n");
		alterPointee(r1);
		System.out.println("In method go. r1 " + r1 + "\\n");

		alterPointer(r1);
		System.out.println("In method go. r1 " + r1 + "\\n");
	}

	public static void alterPointee(Rectangle r)
	{	System.out.println("In method alterPointee. r " + r + "\\n");
		r.setSize(20, 30);
		System.out.println("In method alterPointee. r " + r + "\\n");
	}

	public static void alterPointer(Rectangle r)
	{	System.out.println("In method alterPointer. r " + r + "\\n");
		r = new Rectangle(5, 10, 30, 35);
		System.out.println("In method alterPointer. r " + r + "\\n");
	}

}`
}
