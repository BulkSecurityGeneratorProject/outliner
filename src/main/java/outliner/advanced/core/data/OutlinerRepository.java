package outliner.advanced.core.data;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OutlinerRepository<T, ID> extends JpaRepository<T, ID> {

	public T saveFlushAndRefresh(T entity);

	//<R> Page<R> findAllProjections(Specification<T> spec, Class<R> projectionType, Pageable pageable);

}
