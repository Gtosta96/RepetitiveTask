package x;

/**
 * This class has the responsability to be used as example
 * @author glhu
 */
public class SuperFile {

	/** property that keeps name value */
	private String name;

	/** property that keeps age value */
	private Integer age;

	public SuperFile() {}

	public SuperFile(String name, Integer age) {
		this.name = name;
		this.age = age;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getAge() {
		return age;
	}
	public void setAge(Integer age) {
		this.age = age;
	}


}
